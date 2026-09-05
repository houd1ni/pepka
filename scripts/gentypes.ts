import { execFileSync } from 'child_process'
import { cpSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'

const cwd = process.cwd()
const tsgo = join(cwd, 'node_modules', 'typescript', 'bin', 'tsc')
const tmp = join(cwd, 'dist', 'dts')

try {
  rmSync(tmp, { recursive: true, force: true })
  for(const f of readdirSync(join(cwd, 'dist'))) if(f.endsWith('.d.ts')) rmSync(join(cwd, 'dist', f))
  execFileSync('node', [tsgo, '--emitDeclarationOnly', '--declaration', '--outDir', 'dist/dts'], { stdio: 'inherit' })
  for(const f of readdirSync(join(tmp, 'src'), { withFileTypes: true })) {
    if(!f.name.endsWith('.d.ts')) continue
    const dest = join(cwd, 'dist', f.name)
    cpSync(join(tmp, 'src', f.name), dest, { force: true })
    fix(dest)
  }
  rmSync(join(cwd, 'dist', 'types'), { recursive: true, force: true })
  cpSync(join(tmp, 'types'), join(cwd, 'dist', 'types'), { recursive: true, force: true })
  rmSync(tmp, { recursive: true, force: true })
  const walk = (dir: string) => {
    for(const f of readdirSync(dir, { withFileTypes: true }))
      f.isDirectory() ? walk(join(dir, f.name)) : f.name.endsWith('.d.ts') && fix(join(dir, f.name))
  }
  walk(join(cwd, 'dist'))
} catch(err) {
  console.error(`gentypes failed: ${err}`)
  process.exit(1)
}

/** nodenext consumers: emitted relative specifiers are extensionless, which is
 *  illegal in an ESM d.ts there — append .js where a file extension is missing. */
function fix(file: string) {
  const src = readFileSync(file, 'utf8')
  const out = src
    .replace(/(['"])\.\.\/types\//g, '$1./types/')
    .replace(/((?:from\s+|import\()['"])(\.\.?\/[^'"]+?)(['"])/g, (m, pre, path, q) =>
      /\.[cm]?js$/.test(path) || /\.d\.ts$/.test(path) ? m : `${pre}${path}.js${q}`)
  if(out !== src) writeFileSync(file, out)
}