## Memory Erasure

<img src="icon.png" alt="logo" height="200px" >

<p align="center">
  <a href="https://www.npmjs.com/package/memory-erasure" target="_blank"><img src="https://img.shields.io/npm/v/memory-erasure.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/memory-erasure" target="_blank"><img src="https://img.shields.io/npm/l/memory-erasure.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/memory-erasure" target="_blank"><img src="https://img.shields.io/npm/dm/memory-erasure.svg" alt="NPM Downloads" /></a>
</p>

### Table of contents

- [Installation](#Installation)
- [Description](#Description)
- [Example](#Example)
- [Interfaces](#Interfaces)
- [eraseMemory](#eraseMemory)

### Installation

```console
npm i memory-erasure
```

### Description

Node.js package intended to replace the deleted file content with random
numbers. It fills the whole free disk space with 1MB of data on each
iteration. This package is useful when you want to completely erase
the sensitive data from the disk sectors after you delete the file(s)
that contain this sensitive data.

### Example

```ts
import { eraseMemory } from 'memory-erasure'

eraseMemory((err, data) => {
  if (err) console.error(err)
  else if (data)
    console.log(`erased ${data.erasedMemoryByteLength / 1e6 / 1e3} GB`)
})
```

### Interfaces

```ts
type Callback = (err: any, data: null | IStatus) => void
```

```ts
interface IStatus {
  erasedMemoryByteLength: number
  finished: boolean
}
```

### eraseMemory

- `cb: Callback`
- Returns: `IStatus`
