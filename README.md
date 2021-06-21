![image](https://user-images.githubusercontent.com/7501201/122691868-ae59f800-d23a-11eb-97fa-c0fab3cb0808.png)

HI! Meet pepka - JavaScript/TypeScript functional programming utilities library named after my paraqeet.

This lib is intended to be a functional toolkit more flexible than ramda is.
Its' basic API is similimar to ramda's one.
Other goals are:
- Async pipes. They are not super-pure, but super handy.
- Most flexible types as possible (Let'em be any better than crashing because of their failures. I'm currently working on full JSDocs and better basic types).
- Tree-shakeble ans smallest possible. What could be native, is native.
- Has "quick" alternatives of most computation-heavy functions with `q` prefix which are not completely safe by fp means.
- Has some basic additinal must-have stuff that ramda does not.

Full docs are coming,
please reference ramda's ones for most operations and examples: https://ramdajs.com/docs/

Basic API differences:
- mergeDeep - replaces arrays.
  - mergeDeepX - replaces elements with same indexes.
  - mergeDeepAdd - adds new element to arrays.
- type - returns type UpperCased of anything passed to it, including classes and typed arrays.
- mapKeys - changes existing keys and data by map or function like usual mapper.
- explore(label)(data) - `compose(explore('the number'))(42)` results in `'the number', 42` in console passing by the data.
- genBy(generator(index), length) - generates arrays.
- sizeof(array or object) - counts indexes of it.
- Aliases: mirror, reflect, echo = identity.
- Quicks: qappend, qassoc, qreduce, qmergeDeep, qmergeDeepX, qmergeDeepAdd, qmapKeys, qfilter

Async APIs:
- composeAsync - waits for a Promise if emitted by a pipe inside it.
- waitAll = Promise.all
- forEachAsync - runs a handler with all elements passed in parallel.
- forEachSerial - waits for a previous handler to resolve if Promise emitted.