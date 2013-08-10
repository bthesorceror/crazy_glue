var tape      = require('tape');
var CrazyGlue = require('./index');

(function() {

  tape("has correct output on 'done' event", function(t) {
    t.plan(1);

    glue = new CrazyGlue(2);

    glue.on('done', function(output) {
      t.deepEqual(output, { hello: 'world', ted: 'talk', errors: [] });
    });

    glue.set('hello', 'world');
    glue.set('ted', 'talk');
  });

  tape("has correct errors on skips", function(t) {
    t.plan(1);

    glue = new CrazyGlue(2);

    glue.on('done', function(output) {
      t.deepEqual(output, { errors: ['1'] }, 'correct errors');
    });

    glue.skip('1');
    glue.skip();
  });

  tape("reset is called when done", function(t) {
    t.plan(1);

    glue = new CrazyGlue(2);

    glue.reset = function() {
      t.ok(true, 'reset function was called');
    }

    glue.set('hello', 'world');
    glue.set('ted', 'talk');
  });

})();
