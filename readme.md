[![npm version](https://badge.fury.io/js/repoinfojs.svg)](https://badge.fury.io/js/repoinfojs) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## RepoInfoJS - Simple repository information function

Usage:

```js
import getRepoInfo from 'repoinfojs'

const info = await getRepoInfo()
console.log(info)

/* Output:

 { formatted: 'master-1',
   branch: 'master',
   hash: 'b5508f6',
   hashFull: 'b5508f67e32948b49dcd9b3c2dd1e0afe53bbf89',
   commits: '1' } */
```

You can pass one additional argument:

* `getUname` (String|Array) - Passing a string here will cause the output of `uname` to be included as well. E.g. passing `'-n'` will run `uname -n` and include the output. You can include an array of strings as well.

For example:

```js
import getRepoInfo from 'repoinfojs'

const info = await getRepoInfo(['-n', '-m'])
console.log(info)

/* Output:

 { formatted: 'master-1',
   branch: 'master',
   hash: 'b5508f6',
   hashFull: 'b5508f67e32948b49dcd9b3c2dd1e0afe53bbf89',
   commits: '1',
   uname: [ 'Vesuvius.local', 'x86_64' ] } */
```

This function uses external calls and returns a `Promise`. In case of an error, all `null` values are returned.

## Copyright

MIT license.
