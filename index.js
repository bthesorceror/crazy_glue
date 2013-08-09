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
  this._errors = this._errors || [];
  return this._errors;
}

CrazyGlue.prototype.reset = function() {
  this._output = null;
  this._errors = null;
  this.currentCount = 0;
}

CrazyGlue.prototype.finalOutput = function() {
  var output = this.output();
  output['errors'] = this.errors();
  return output;
}

CrazyGlue.prototype.countIncrement = function() {
  this.currentCount += 1;
  if (this.currentCount == this.count) {
    this.emit('done', this.finalOutput());
    this.reset();
  }
}

CrazyGlue.prototype.set = function(key, value) {
  this.output()[key] = value;
  this.countIncrement();
}

CrazyGlue.prototype.skip = function(message) {
  if (message)
    this.errors().push(message);
  this.countIncrement();
}

module.exports = CrazyGlue;
