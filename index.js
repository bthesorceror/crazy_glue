function CrazyGlue(count) {
  this.count = count;
  this.currentCount = 0;
  this._ok_count = 0;
  this._error_count = 0;
}

(require('util').inherits(CrazyGlue, (require('events')).EventEmitter));

CrazyGlue.prototype.output = function() {
  this._output = this._output || {};
  return this._output;
}

CrazyGlue.prototype.errors = function() {
  this._errors = this._errors || {};
  return this._errors;
}

CrazyGlue.prototype.reset = function() {
  this._output = null;
  this._errors = null;
  this._error_count = 0;
  this._ok_count = 0;
  this.currentCount = 0;
}

CrazyGlue.prototype.stats = function() {
  return {
    okCount: this._ok_count,
    errorCount: this._error_count
  };
}

CrazyGlue.prototype.countIncrement = function() {
  this.currentCount += 1;
  if (this.currentCount == this.count) {
    process.nextTick(function() {
      this.emit('done', this.errors(), this.output(), this.stats());
      this.reset();
    }.bind(this));
  }
}

CrazyGlue.prototype.ok = function(key, val) {
  if (key && val)
    this._handleKey(key, val, this.output());
  this._ok_count += 1;
  this.countIncrement();
}

CrazyGlue.prototype._handleKey = function(key, val, obj) {
  if (!obj[key]) {
    obj[key] = val;
  } else if (typeof(obj[key]) == Array) {
    obj[key].push(val);
  } else {
    var v = obj[key];
    var result = [v];
    result.push(val);
    obj[key] = result;
  }
}

CrazyGlue.prototype.error = function(key, val) {
  if (key && val)
    this._handleKey(key, val, this.errors());
  this._error_count += 1;
  this.countIncrement();
}

module.exports = CrazyGlue;
