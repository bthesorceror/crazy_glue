Crazy Glue
==========

Allows you to pull together multiple async calls together into one object literal.

Usage
-----

**Basic**

```javascript

var CrazyGlue = require('crazy_glue');

var glue = new CrazyGlue(3);

glue.ok('1', 'hello');
glue.ok('2', 'world');
glue.ok('3', 'test');

glue.on('done', function(errors, results) {
  // Do something with arguments
});

```

results will be

```javascript

{ 1: 'hello', 2: 'world', 3: 'test' }

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

glue.on('done', function(obj) {
  // Do something with arguments
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
