interface Dependencies {
  [key: string]: string[]
}

export function getDependencies(map: Dependencies, repo: string): string[] {
  const list = map[repo]
  console.log('list', list)
  if (list) {
    return [...list, repo]
  } else {
    return [repo]
  }
}
