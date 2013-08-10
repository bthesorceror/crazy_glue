Crazy Glue
==========

Allows you to pull together multiple async calls together into one object literal.

Usage
-----

**Basic**

```javascript

var CrazyGlue = require('crazy_glue');

var glue = new CrazyGlue(3);

glue.set('1', 'hello');
glue.set('2', 'world');
glue.set('3', 'test');

glue.on('done', function(obj) {
  // Do something with obj
});

```

obj will be

```javascript

{ 1: 'hello', 2: 'world', 3: 'test', errors: [] }

```

**With errors**

```javascript

var CrazyGlue = require('crazy_glue');

var glue = new CrazyGlue(3);

glue.set('1', 'hello');
glue.skip('world failed');
glue.skip('test failed');

glue.on('done', function(obj) {
  // Do something with obj
});

```

obj will be

```javascript

{ 1: 'hello', errors: ['world failed', 'test failed'] }

```
