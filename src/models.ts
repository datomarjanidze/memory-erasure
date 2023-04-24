export interface IStatus {
  erasedMemoryByteLength: number
  finished: boolean
}

export type Callback = (err: any, data: null | IStatus) => void
