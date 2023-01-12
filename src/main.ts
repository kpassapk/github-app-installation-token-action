import { setFailed, setOutput, getInput } from '@actions/core'
import { getToken } from 'github-app-installation-token'
import * as yaml from 'js-yaml'
import * as fs from "fs"

function getDependencies(): string[] {
  let repos = []

  try {
    const doc = yaml.load(fs.readFileSync('repos.yml', 'utf8'))
    console.log(doc)
    const thisRepo = process.env['GITHUB_REPOSITORY']
    console.log(thisRepo)
    const deps = doc[thisRepo]
    if (deps) {
      // TODO Assert that deps is an array
      console.log(deps)
      repos = deps
    }
  } catch (e) {
    console.log(e)
  }
  return repos
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
