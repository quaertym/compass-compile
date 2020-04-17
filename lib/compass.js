var execFile  = require('child_process').execFile;
var merge = require('merge');
var dargs = require('dargs');
var RSVP  = require('rsvp');

var generateCommand = function(options) {
  var excludes = ['compassCommand'];
  var args = dargs(options, { excludes: excludes });
  var command = ['compile'].concat(args);
  return command;
};

function Compass() {
  this.defaultOptions = {
    compassCommand: 'compass'
  };
}

Compass.prototype.compile = function(options) {
  var compassOptions = merge(this.defaultOptions, options || {});
  var command = generateCommand(compassOptions);
  return new RSVP.Promise(function(resolve, reject) {
    execFile(compassOptions.compassCommand, command, function(error, stdout, stderr) {
      if (error) {
        if (stdout) { console.log(stdout); }
        if (stderr) { console.log(stderr); }
        reject(error);
      } else {
        resolve(compassOptions.cssDir);
      }
    });
  });
};

module.exports = Compass;
