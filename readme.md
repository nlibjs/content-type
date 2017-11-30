# @nlib/content-type

[![Build Status](https://travis-ci.org/nlibjs/content-type.svg?branch=master)](https://travis-ci.org/nlibjs/content-type)
[![Build status](https://ci.appveyor.com/api/projects/status/github/nlibjs/content-type?branch=mater&svg=true)](https://ci.appveyor.com/project/kei-ito/content-type/branch/master)
[![codecov](https://codecov.io/gh/nlibjs/content-type/branch/master/graph/badge.svg)](https://codecov.io/gh/nlibjs/content-type)
[![dependencies Status](https://david-dm.org/nlibjs/content-type/status.svg)](https://david-dm.org/nlibjs/content-type)
[![devDependencies Status](https://david-dm.org/nlibjs/content-type/dev-status.svg)](https://david-dm.org/nlibjs/content-type?type=dev)

Returns a content type from file extension.

## Install

```
npm install @nlib/content-type
```

## Usage

```javascript
const ContentType = require('@nlib/content-type');
const contentType = new ContentType();

// return a content-type
console.log(contentType.get('foo/bar.html'));
// text/html

// returns an extension
console.log(contentType.getExtname('application/json'));
// .json

// returns the default content-type if nothing matched.
console.log(contentType.get('foo/bar.bar'));
// text/plain

// changes the default content-type
contentType.defaultContentType = 'unknown/type';
console.log(contentType.get('foo/bar.bar'));
// unknown/type

// maps content-type to file extensions
contentType.set('test/baz', ['bar', 'baz']);
console.log(contentType.get('foo/bar.bar'));
// test/baz
console.log(contentType.get('foo/bar.baz'));
// test/baz
console.log(contentType.getExtname('test/baz'));
// .bar
```

## Javascript API

See [Usage](#usage) section.

## LICENSE

MIT
