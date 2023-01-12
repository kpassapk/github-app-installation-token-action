import { setFailed, setOutput, getInput } from '@actions/core'
import { getToken } from 'github-app-installation-token'
import { load } from 'js-yaml'
import { readFileSync } from "fs"


const REPOS_FILE = 'repos.yml'

interface Dependencies {
  [key: string]: string[]
}


function getDependencies(): string[] {
  let deps: string[] = []
  console.log('Getting dependencies from repos.yml')
  try {
    const doc = load(readFileSync(REPOS_FILE, 'utf8')) as Dependencies

    console.log(doc)
    const thisRepo = process.env.GITHUB_REPOSITORY as string
    console.log("this repo:", thisRepo)
    const list = doc[thisRepo]
    if (list) {
      // TODO Assert that deps is an array
      console.log(list)
      deps = list
    } else {
      deps = []
    }
  } catch (e) {
    console.log(e)
  }
  console.log(deps)
  return deps
}

export async function run(): Promise<void> {
  try {
    const appId = parseInt(getInput('appId'), 10)
    const installationId = parseInt(getInput('installationId'), 10)
    const privateKey = getInput('privateKey')
    const baseUrl = getInput('baseUrl', { required: false }) || undefined

    // Get document, or throw exception on error
    const repositoryNames = getDependencies()

    const { token } = await getToken({ appId, installationId, privateKey, baseUrl, repositoryNames })

    setOutput('token', token)
  } catch (error) {
    setFailed(error.message)
  }
}
