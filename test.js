var tape      = require('tape');
var CrazyGlue = require('./index');

(function() {

  tape("has correct output on 'done' event", function(t) {
    t.plan(2);

    glue = new CrazyGlue(3);

    glue.on('done', function(errors, results) {
      t.deepEqual(results, { hello: 'world', ted: 'talk' }, 'correct results');
      t.deepEqual(errors, {}, 'correct errors');
    });

    glue.ok('hello', 'world');
    glue.ok('ted', 'talk');
    glue.ok();
  });

  tape("has correct errors", function(t) {
    t.plan(2);

    glue = new CrazyGlue(2);

    glue.on('done', function(errors, results) {
      t.deepEqual(Object.keys(results), [], 'correct results');
      t.deepEqual(errors, { key: 'error' }, 'correct errors');
    });

    glue.error('key', 'error');
    glue.error();
  });

  tape("reset is called when done", function(t) {
    t.plan(1);

    glue = new CrazyGlue(2);

    glue.reset = function() {
      t.ok(true, 'reset function was called');
    }

    glue.ok('hello', 'world');
    glue.ok('ted', 'talk');
  });

})();
