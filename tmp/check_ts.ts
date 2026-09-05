import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const ts = require('typescript')
console.log('version:', ts.version)
console.log('getOutputFileNames:', typeof ts.getOutputFileNames)
console.log('sys:', typeof ts.sys)
console.log('createProgram:', typeof ts.createProgram)
