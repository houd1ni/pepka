import test from 'ava'
// import { Renderer } from '../../dist/bundle.esm'
const { css } = require('../../dist/bundle')
const fs = require('fs').promises

test('lit-css', (t) => {
  return new Promise(async (ff) => {
    try {
      const value = 40
      const obj = {
        margin: 'some-shit',
        padding: 'some-shit',
        those: 'shiii',
        marginLeft: 40,
        marginRight: '10px',
        '>*:first-of-type': {
          shit: 66,
          '& .inner': {
            left: 42
          }
        },
        cls: {
         '& .red': {
            padding: 5
         },
         '& .green': {
            padding: 5
          }
        }
      }
      const rule = () => css`
        margin: some-shit;
        padding some-shit; those: shiii
        margin-left: ${value}
        margin-right: 10px
        >*:first-of-type {
          shit 66
          .inner {
            left: 42
          }
        }
        .cls: {
         .red, .green: {
           padding: 5
           // margin: 7px 5px
        }
      `

      ff(t.deepEqual(rule(), obj))
    } catch(e) {
      ff(t.fail(e))
    }
  })
})