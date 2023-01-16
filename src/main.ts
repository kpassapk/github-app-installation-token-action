import { setFailed, setOutput, getInput } from '@actions/core'
import { getToken } from 'github-app-installation-token'
import { getDependencies } from "./dependencies"
const github = require('@actions/github');
import DEPENDENCY_MAP from './repos.json'

export async function run(): Promise<void> {
  try {
    const appId = parseInt(getInput('appId'), 10)
    const installationId = parseInt(getInput('installationId'), 10)
    const privateKey = getInput('privateKey')
    const baseUrl = getInput('baseUrl', { required: false }) || undefined

    const thisRepo = github.event.repository.name

    console.log("this repo:", thisRepo)
    const repositoryNames = getDependencies(DEPENDENCY_MAP, thisRepo)

    const { token } = await getToken({ appId, installationId, privateKey, baseUrl, repositoryNames })

    setOutput('token', token)
  } catch (error) {
    setFailed(error.message)
  }
}
