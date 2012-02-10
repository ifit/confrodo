
## Basic Usage

```javascript
var confrodo = require("confrodo")
  , config
  , filename = "myconfig.json"
  , defaults = { "foo":"bar", "meow":"mix" };

// You may pass in an object, a filename,
// the string "ARGV", or the string "ENV".
// Options passed in later will override attributes
// with the same name from previous options.
config = confrodo(defaults, filename, "ARGV", "ENV");

```

Files may either be a valid json file or a javascript
file that returns a json object in modules.exports.

Objects are json objects (not arrays).

`"ARGV"` will load any command line options (see [optimist](https://github.com/substack/node-optimist).)

`"ENV"` will load environment variables.

Confrodo also will create an `env` property you can use to choose a file:

```javascript

var confrodo = require("confrodo")
  , filename = __dirname + "/" + confrodo.env + ".json"
  , config = confrodo(filename);

```

See LICENSE for copyright info.
