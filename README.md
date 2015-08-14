# FoxTail

みこーん。

Twitter BOT for node.  
You can easily add plugin.

## Installation

```
npm install foxtail
```

## Example

### 1. Set keys

Set your keys.

```
$ export CONSUMER_KEY= ...
$ export CONSUMER_SECRET= ...
$ export ACCESS_TOKEN= ...
$ export ACCESS_TOKEN_SECRET= ...
```

### 2. Setup FoxTail.
main.js

```js
var FoxTail = require('foxtail');
var fox = new FoxTail();

// show timeline
fox.add(function (res) {
    console.log("@" + res.screen_name + "(" + res.name + ") " + res.text + "\n");
});

// reply to words
fox.add(function (res) {
    if (res.text === 'ぬるぽ') fox.reply('ガッ');
});

fox.run();
```

### 3. Run

```
$ node main.js
```

## Development

```
# example
npm run example
# watch
npm run watch
# build
npm run build
# test
npm test
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
MIT
