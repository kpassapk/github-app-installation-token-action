import {setFailed, setOutput, getInput} from '@actions/core'
import {getToken} from './getToken'
import {getDependencies} from './dependencies'
import DEPENDENCY_MAP from './repos.json'

function getRepo(): string {
  const thisRepo = process.env.GITHUB_REPOSITORY as string
  if (!thisRepo) {
    throw new Error('GITHUB_REPOSITORY is not set')
  }
  const [_, repo] = thisRepo.split('/')
  console.log('this repo:', thisRepo, repo)
  return repo
}

export async function run(): Promise<void> {
  try {
    const appId = parseInt(getInput('appId'), 10)
    const installationId = parseInt(getInput('installationId'), 10)
    const privateKey = getInput('privateKey')
    const baseUrl = getInput('baseUrl', {required: false}) || undefined

    const thisRepo = getRepo()
    const repositoryNames = getDependencies(DEPENDENCY_MAP, thisRepo)

    const {token} = await getToken({
      appId,
      installationId,
      privateKey,
      baseUrl,
      repositoryNames
    })

    setOutput('token', token)
  } catch (error) {
    setFailed(error.message)
  }
}
