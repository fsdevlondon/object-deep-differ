# Object deep differ

Return the difference between the source object and the default object.

## Installation

    npm install --save object-deep-differ

## Usage

```javascript
const diff = require('object-deep-differ');

const defaultObj = {a:{b:{c:'hello'}}}

const sourceObj = {a:{d:{e:'hello world'}}}

console.log(diff(defaultObj, sourceObj)); // outputs {a:{d:{e:'hello world'}}}

```

## Tests

    npm test