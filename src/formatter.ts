import { glob } from 'glob'
import { readFileSync, writeFileSync } from 'fs'
import { getFileInfo, resolveConfig, format } from 'prettier'
import { green } from 'chalk'
import * as path from 'path'

export function findFiles(target: string) {
  return [...glob.sync(`${target}/**/**/*`, { nodir: true })]
}

export function prettierFormatter(filePath: string) {
  return getFileInfo(filePath)
    .then(({ inferredParser: parser }) =>
      resolveConfig(path.join(process.cwd())).then((options) => ({
        ...options,
        parser,
        data: readFileSync(filePath, 'utf-8'),
      }))
    )
    .then(({ data, ...options }) =>
      writeFileSync(filePath, format(data, options), 'utf-8')
    )
    .then(() => green(`Formatted ${filePath}`))
}
