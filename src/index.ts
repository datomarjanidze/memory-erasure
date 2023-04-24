import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'url'

import { IStatus, Callback } from './models'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const EACH_FILE_CONTENT_BYTE_LENGTH = 1e6
const NEW_MEMORY_PATH = join(__dirname, 'new-memory')

class MemoryErasure {
  private fileContent = ''

  eraseMemory(cb?: Callback): IStatus {
    this.deleteMemory()
    mkdirSync(NEW_MEMORY_PATH)
    this.fileContent = this.generateNewMemoryContent()
    const status = this.createMemory(cb)
    this.deleteMemory()
    status.finished = true
    return status
  }

  private generateNewMemoryContent(): string {
    let fileContent = String(Math.random())

    while (Buffer.byteLength(fileContent) < EACH_FILE_CONTENT_BYTE_LENGTH)
      fileContent += `${String(Math.random())}`

    while (Buffer.byteLength(fileContent) !== EACH_FILE_CONTENT_BYTE_LENGTH)
      fileContent = fileContent.slice(0, fileContent.length - 1)

    return fileContent
  }

  private createMemory(cb?: Callback): IStatus {
    let newMemoryFileIndex = 0
    const status: IStatus = {
      finished: false,
      erasedMemoryByteLength: 0
    }

    while (true) {
      try {
        writeFileSync(
          join(NEW_MEMORY_PATH, String(newMemoryFileIndex++)),
          this.fileContent
        )

        if (cb) {
          status.erasedMemoryByteLength = newMemoryFileIndex * 1e6
          cb(null, status)
        }
      } catch (e) {
        status.erasedMemoryByteLength = newMemoryFileIndex * 1e6

        if (cb) cb(null, status)
        return status
      }
    }
  }

  private deleteMemory(): void {
    if (existsSync(NEW_MEMORY_PATH))
      rmSync(NEW_MEMORY_PATH, { recursive: true })
  }
}

const memoryErasure = new MemoryErasure()

function eraseMemory(cb?: Callback): undefined | IStatus {
  try {
    return memoryErasure.eraseMemory(cb)
  } catch (error) {
    if (cb) cb(error, null)
    else console.error(error)
    return undefined
  }
}

export { eraseMemory, IStatus, Callback }
