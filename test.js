var tape      = require('tape');
var CrazyGlue = require('./index');

(function() {

  tape("has correct output on 'done' with arrays", function(t) {
    t.plan(1);

    glue = new CrazyGlue(3);

    glue.on('done', function(errors, results, stats) {
      t.deepEqual(results, { hello: ['world', 'talk'] }, 'correct results');
    });

    glue.ok('hello', 'world');
    glue.ok('hello', 'talk');
    glue.ok();
  });

  tape("has correct errors on 'done' with arrays", function(t) {
    t.plan(1);

    glue = new CrazyGlue(3);

    glue.on('done', function(errors, results, stats) {
      t.deepEqual(errors, { hello: ['world', 'talk'] }, 'correct results');
    });

    glue.error('hello', 'world');
    glue.error('hello', 'talk');
    glue.error();
  });

  tape("has correct output on 'done' event", function(t) {
    t.plan(4);

    glue = new CrazyGlue(3);

    glue.on('done', function(errors, results, stats) {
      t.deepEqual(results, { hello: 'world', ted: 'talk' }, 'correct results');
      t.deepEqual(errors, {}, 'correct errors');
      t.equal(stats.okCount, 3);
      t.equal(stats.errorCount, 0);
    });

    glue.ok('hello', 'world');
    glue.ok('ted', 'talk');
    glue.ok();
  });

  tape("has correct errors", function(t) {
    t.plan(4);

    glue = new CrazyGlue(2);

    glue.on('done', function(errors, results, stats) {
      t.deepEqual(Object.keys(results), [], 'correct results');
      t.deepEqual(errors, { key: 'error' }, 'correct errors');
      t.equal(stats.okCount, 0);
      t.equal(stats.errorCount, 2);
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
