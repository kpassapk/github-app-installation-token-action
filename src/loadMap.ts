import { load } from "js-yaml"
import { readFileSync, writeFileSync } from "fs"

interface Dependencies {
  [key: string]: string[]
}

export function loadDependencyFile(file: string): Dependencies {
  console.log('Getting dependencies from repos.yml')
  let doc
  try {
    doc = load(readFileSync(file, 'utf8')) as Dependencies

    console.log(doc)

    // TODO verify doc is a map of string to a list of strings
  } catch (e) {
    doc = {}
    console.log(e)
  }
  return doc
}

// Write the dependencies to src/repos.json
export function writeToJson(dep: Dependencies, outFile: string): void {
  const data = JSON.stringify(dep, null, 2)
  writeFileSync(outFile, data)
}