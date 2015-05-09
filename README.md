# numbers-today

[numbers.today API](https://numbers.today/api/documentation/) client library for node.js/io.js

[![Build Status](https://travis-ci.org/analog-nico/node-numbers-today.svg?branch=master)](https://travis-ci.org/analog-nico/node-numbers-today) [![Coverage Status](https://coveralls.io/repos/analog-nico/node-numbers-today/badge.svg?branch=master)](https://coveralls.io/r/analog-nico/node-numbers-today?branch=master) [![Dependency Status](https://david-dm.org/analog-nico/node-numbers-today.svg)](https://david-dm.org/analog-nico/node-numbers-today)

## Installation

[![NPM Stats](https://nodei.co/npm/numbers-today.png?downloads=true)](https://npmjs.org/package/numbers-today)

This is a module for node.js and io.js and is installed via npm:

``` bash
npm install numbers-today --save
```

## Getting Started

``` js
var numbersToday = require('numbers-today');

// Counting

numbersToday('username', 'password')
    .button('blogposts')
	.hit();

numbersToday('token')
	.button('moneyspent')
	.hit(15.5, 'NY');

// Support for other API features forthcoming.
```

## Contributing

To set up your development environment for numbers-today:

1. Clone this repo to your desktop,
2. in the shell `cd` to the main folder,
3. hit `npm install`,
4. hit `npm install gulp -g` if you haven't installed gulp globally yet, and
5. run `gulp dev`. (Or run `node ./node_modules/.bin/gulp dev` if you don't want to install gulp globally.)

`gulp dev` watches all source files and if you save some changes it will lint the code and execute all tests. The test coverage report can be viewed from `./coverage/lcov-report/index.html`.

If you want to debug a test you should use `gulp test-without-coverage` to run all tests without obscuring the code by the test coverage instrumentation.

## Change History

Not yet realeased.

## License (ISC)

In case you never heard about the [ISC license](http://en.wikipedia.org/wiki/ISC_license) it is functionally equivalent to the MIT license.

See the [LICENSE file](LICENSE) for details.
