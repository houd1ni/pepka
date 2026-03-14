import { qpick } from "./quick"
import { genBy, identity, range } from "./safe"


if(false) {
  // genBy with [...Array(length)].map(...) performs @ average 53.193s/1e5, 303ms/1e4.
  console.time('genBy') // now: 17s/1e5, 65ms/1e4
  for(let i=0; i<1e5; i++) genBy(identity, i)
  console.timeEnd('genBy')
}

// qpick:
// if o = {1: 'yep', 4: 'yep', 'kakashka': 'noooo', 'anotherkakashka': 'nonono!'}:
// w/  Set: with range(0, 5) -> 83ms; range(0, 50) -> 189ms.
// w/o Set: with range(0, 5) -> 69ms; range(0, 50) -> 75ms.
// if o is generated with 52+ leaset keys are not included in props (generator included!):
// w/  Set: with range(0, 5) -> 998ms; range(0, 50) -> 1100ms.
// w/o Set: with range(0, 5) -> 1000ms;  range(0, 50) -> 1065ms.
// pick:
// if o = {1: 'yep', 4: 'yep', 'kakashka': 'noooo', 'anotherkakashka': 'nonono!'}:
// w/o Set: with range(0, 5) -> 18ms; range(0, 50) -> 40ms.
// if o is generated with 52+ leaset keys are not included in props (generator included!):
// w/o Set: with range(0, 5) -> 600ms;  range(0, 50) -> 647ms.
for(let j=0; j<1e4; j+=1e3) {
  console.time('qpick @'+j)
  const props = range(0, 5)
  for(let i=0; i<1e5; i++) {
    const o = {1: 'yep', 4: 'yep', 'kakashka': 'noooo', 'anotherkakashka': 'nonono!'}
    // for(const x of range(0, 50)) o['_'+x] = x
    qpick(props, o)
  }
  console.timeEnd('qpick @'+j)
}