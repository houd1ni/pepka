import prepend from 'prepend'

const s = 'export { __ }\n'

prepend('./dist/bundle.d.ts', s, function(error) {
  if (error)
    console.error(error.message)
})