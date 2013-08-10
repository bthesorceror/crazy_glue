function CrazyGlue(count) {
  this.count = count;
  this.currentCount = 0;
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
  this.currentCount = 0;
}

CrazyGlue.prototype.countIncrement = function() {
  this.currentCount += 1;
  if (this.currentCount == this.count) {
    this.emit('done', this.errors(), this.output());
    this.reset();
  }
}

CrazyGlue.prototype.ok = function(key, val) {
  if (key && val)
    this.output()[key] = val;
  this.countIncrement();
}

CrazyGlue.prototype.error = function(key, val) {
  if (key && val)
    this.errors()[key] = val;
  this.countIncrement();
}

module.exports = CrazyGlue;
