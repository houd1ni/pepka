// Type tests for src/strings.ts — verified by tsc and tsgo.

import { getTmpl } from '../../src'

// ── getTmpl ──
const _tmpl = getTmpl('Hello {{name}}!')
const _rendered: string = _tmpl({ name: 'world' })
const _tmplCurried = getTmpl('Hello {{name}}!')