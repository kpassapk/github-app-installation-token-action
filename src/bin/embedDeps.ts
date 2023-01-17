import { loadDependencyFile, writeToJson } from '../loadMap'

const REPOS_FILE = 'repos.yml'
const OUT_FILE = 'src/repos.json'

const m = loadDependencyFile(REPOS_FILE)

writeToJson(m, OUT_FILE)

console.log("Wrote", OUT_FILE)