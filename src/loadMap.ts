import { load } from "js-yaml"
import { readFileSync, writeFileSync } from "fs"

const REPOS_FILE = 'src/repos.yml'

interface Dependencies {
  [key: string]: string[]
}

export function loadDependencyFile(): Dependencies {
  console.log('Getting dependencies from repos.yml')
  let doc
  try {
    doc = load(readFileSync(REPOS_FILE, 'utf8')) as Dependencies

    console.log(doc)

    // TODO verify doc is a map of string to a list of strings
  } catch (e) {
    doc = {}
    console.log(e)
  }
  return doc
}

// Write the dependencies to src/repos.json
export function writeToJson(dep: Dependencies): void {
  const data = JSON.stringify(dep, null, 2)
  writeFileSync('src/repos.json', data)
}