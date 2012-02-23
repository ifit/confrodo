
## Basic Usage

You may pass in an object, a filename,
the string "ARGV", or the string "ENV".

Options passed in later will override attributes
with the same name from previous options.

Arguments may be passed in any order.

```javascript
var confrodo = require("confrodo")
  , config
  , filename = "myconfig.json"
  , defaults = { "foo":"bar", "meow":"mix" };

config = confrodo(defaults, filename, "ARGV", "ENV");
```

Files may either be a valid json file or a javascript
file that returns a json object in modules.exports.

Objects are json objects (not arrays).

`"ARGV"` will load any command line options (see [optimist](https://github.com/substack/node-optimist).)

`"ENV"` will load environment variables.

Confrodo also has an `env` property you can use to choose a file:

```javascript

var confrodo = require("confrodo")
  , filename = __dirname + "/" + confrodo.env + ".json"
  , config = confrodo(filename);

```

`confrodo.env` will be `"local"`, unless the `NODE_ENV`
environment variable is set, or `env` is passed as a command
line argument.

See LICENSE for copyright info.
