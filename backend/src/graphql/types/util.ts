import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const readProps: { encoding: BufferEncoding } = {
  encoding: 'utf-8'
}

const cwd = ['src', 'graphql', 'types']

export const readGraphql = (filename: string) => readFileSync(resolve(...cwd, filename), readProps)
