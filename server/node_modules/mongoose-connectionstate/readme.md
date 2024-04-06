
node-mongoose-connectionstate
============

a little gateway to mongoose state

### Installation

```bash
$ npm install mongoose-connectionstate
```

### Usage

```js
var STATES = require('mongoose-connectionstate');
console.log(STATES);
console.log(STATES.disconnected);
console.log(STATES.connected);
console.log(STATES.connecting);
console.log(STATES.disconnecting);
console.log(STATES.uninitialized);
```

### License

MIT
