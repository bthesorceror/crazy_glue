Crazy Glue
==========

[![Build Status](https://travis-ci.org/bthesorceror/crazy_glue.png?branch=master)](https://travis-ci.org/bthesorceror/crazy_glue)

Allows you to pull together multiple async calls together.

Usage
-----

**Basic**

```javascript

var CrazyGlue = require('crazy_glue');

var glue = new CrazyGlue(3);

glue.ok('1', 'hello');
glue.ok('2', 'world');
glue.ok('3', 'test');
glue.ok('3', 'test2');

glue.on('done', function(errors, results) {
  // Do something with arguments
});

```

results will be

```javascript

{ 1: 'hello', 2: 'world', 3: ['test', 'test2'] }

```

errors will be

```javascript

{ }

```

**With errors**

```javascript

var CrazyGlue = require('crazy_glue');

var glue = new CrazyGlue(3);

glue.ok('1', 'hello');
glue.error('world', 'failed');
glue.error('test', 'failed');
glue.error('test', 'failed2');

glue.on('done', function(errors, results) {
  // Do something with arguments
});

```

results will be

```javascript

{ 1: 'hello' }

```

errors will be

```javascript

{ world: 'failed', test: ['failed', 'failed2']}

```

**With stats**

```javascript

var CrazyGlue = require('crazy_glue');

var glue = new CrazyGlue(5);

glue.ok('1', 'hello');
glue.ok();
glue.error('world', 'failed');
glue.error('test', 'failed');
glue.error();

glue.on('done', function(errors, results, stats) {
  // stats.okCount == 2
  // stats.errorCount == 3
});

```

results will be

```javascript

{ 1: 'hello' }

```

errors will be

```javascript

{ world: 'failed', test: 'failed'}

```
