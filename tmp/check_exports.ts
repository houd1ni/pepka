import * as src from '../src/index'
import * as dist_esm from '../dist/bundle.mjs'
const sk = Object.keys(src).sort()
const ek = Object.keys(dist_esm).sort()
const only_src = sk.filter(k => !ek.includes(k))
const only_esm = ek.filter(k => !sk.includes(k))
console.log('src:', sk.length, 'esm:', ek.length)
console.log('only_in_src:', only_src.length ? only_src : 'none')
console.log('only_in_esm:', only_esm.length ? only_esm : 'none')
