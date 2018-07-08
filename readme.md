[![npm version](https://badge.fury.io/js/repoinfo.svg)](https://badge.fury.io/js/repoinfo) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## RepoInfo - Simple repository information function

Usage:

```js
import getRepoInfo from 'repoinfo'

const info = await getRepoInfo()
console.log(info)

/* Output:

{ formatted: 'master-1',
  branch: 'master',
  hash: 'cd0f52d',
  hashFull: 'cd0f52d41a509e7996e842fac8b2469916f79c05',
  commits: '1' }
*/
```

You can pass one additional argument:

* `getUname` (String|Array) - Passing a string here will cause the output of `uname` to be included as well. E.g. passing `'-n'` will run `uname -n` and include the output. You can include an array of strings as well.

For example:

```js
const info = await getRepoInfo(['-n', '-m'])
console.log(info)

//
```

This function uses external calls and returns a `Promise`. In case of an error, all `null` values are returned.

## Copyright

MIT license.
