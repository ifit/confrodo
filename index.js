var optimist = require('optimist')
  , argv = optimist.argv;

delete argv['_'];
delete argv['$0'];

var getFile = function(filename) {
  var file;
  try {
    file = require(filename);
  } catch (e) {
    throw new Error("confrodo: can't find file '" + filename + "'");
  }
  return file;
};

var getEnvironment = function() {
  var env;
  if (argv.hasOwnProperty('env')) {
    env = argv.env;
  } else if (typeof process.env.NODE_ENV === 'string') {
    env = process.env.NODE_ENV;
  } else {
    env = 'development';
  }
  return env;
};

var mergeConfig = function(configA, configB) {
  var merged = {}
    , hop = Object.prototype.hasOwnProperty;
  for (var i in configA) {
    if (hop.call(configA, i)) {
      merged[i] = configA[i];
    }
  }
  for (var i in configB) {
    if (hop.call(configB, i)) {
      merged[i] = configB[i];
    }
  }
  return merged;
};

var frodo = function() {
  var args = Array.prototype.slice.call(arguments);
  var config = {};
  config.env = getEnvironment();
  for (var i = 0; i < args.length; ++i) {
    if (typeof args[i] === "string") {
      if (args[i] === "ENV") {
        config = mergeConfig(config, process.env);
      } else if (args[i] === "ARGV") {
        config = mergeConfig(config, argv);
      } else {
        config = mergeConfig(config, getFile(args[i]));
      }
    } else if (typeof args[i] === "object") {
      config = mergeConfig(config, args[i]);
    }
  }
  return config;
};

frodo.env = getEnvironment();

module.exports = frodo;
