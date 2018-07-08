/**
 * RepoInfo - repoinfo <https://bitbucket.org/msikma/callisto-bot>
 * Copyright © 2018, Michiel Sikma
 */

import { exec } from 'child_process'

// Returns null values in case something goes wrong.
const fallback = (uname = []) => ({
  formatted: null,
  branch: null,
  hash: null,
  hashFull: null,
  commits: null,
  ...(uname != null && uname.length > 0 ? { uname: null } : {})
})

/**
 * Wraps runRepoExec() in a try/catch block in case of errors.
 */
const getRepoInfo = async (uname = []) => {
  try {
    const info = await runRepoExec(uname)
    return info
  }
  catch (err) {
    return fallback(uname)
  }
}

/**
 * Retrieves information about the current repository.
 */
const runRepoExec = async (uname = []) => {
  const unameIsArr = Array.isArray(uname)
  const unameArr = unameIsArr ? uname : [uname]
  const [branch, hash, hashFull, commits] = await Promise.all([
    callExternal('git describe --all | sed s@heads/@@'),
    callExternal('git rev-parse --short head'),
    callExternal('git rev-parse head'),
    callExternal('git rev-list head --count')
  ])
  const unameResults = uname.length
    ? await Promise.all(unameArr.map(cmd => callExternal(`uname ${cmd}`)))
    : []

  return {
    formatted: `${branch}-${commits}`,
    branch,
    hash,
    hashFull,
    commits,
    // Unpack uname if it was an array to begin with.
    ...(uname.length ? { uname: unameIsArr ? unameResults : unameResults[0] } : {})
  }
}

/**
 * Calls an external program and returns the result.
 */
const callExternal = (cmd) => (
  new Promise((resolve, reject) => {
    exec(cmd, (error, stdout = '', stderr = '') => {
      if (error) return reject(stdout.trim(), stderr.trim(), error)
      else resolve(stdout.trim(), stderr.trim())
    })
  })
)

export default getRepoInfo
