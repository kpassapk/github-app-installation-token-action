import { load } from "js-yaml"
import { readFileSync, writeFileSync } from "fs"

interface Dependencies {
  [key: string]: string[]
}

export function loadDependencyFile(file: string): Dependencies {
  console.log('Getting dependencies from repos.yml')
  let doc
  try {
    doc = load(readFileSync(file, 'utf8'))
    console.log(doc)
    doc = verifyDocument(doc)
  } catch (e) {
    doc = {}
    console.log(e)
  }
  return doc
}

function verifyDocument(doc: unknown): Dependencies {
  if (typeof doc !== 'object') {
    throw new Error('Document is not an object')
  }
    const map = doc as Dependencies
    for (const key in map) {
        if (map.hasOwnProperty(key)) {
            const element = map[key];
            if (!Array.isArray(element)) {
            throw new Error('Element is not an array')
            }
        }
    }
    return map
}

// Write the dependencies to src/repos.json
export function writeToJson(dep: Dependencies, outFile: string): void {
  const data = JSON.stringify(dep, null, 2)
  writeFileSync(outFile, data)
}