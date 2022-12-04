import prepend from 'prepend'
 
const s = "import {F as FT} from 'ts-toolbelt' \n"

prepend('./dist/bundle.d.ts', s, function(error) {
    if (error)
        console.error(error.message)
})