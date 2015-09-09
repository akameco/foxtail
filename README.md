# FoxTail
みこーん。  

Twitter bot generator for node.js  
You can easily add plugin to your bot.

## Installation

```
npm install foxtail
```

## Easy Example

### 1. Setup FoxTail.

index.js

```js
var FoxTail = require('foxtail');

var fox = new FoxTail({
    consumer_key: ...,
    consumer_secret: ...,
    access_token: ...,
    access_token_secret: ...
});

// show timeline
fox.add(function (res) {
    console.log("@" + res.screen_name + "(" + res.user_name + ") " + res.text + "\n");
});

// reply to words
fox.add(function (res) {
    if (res.text === 'hello') res.reply('world');
});

fox.run();
```

### 2. Run

```
$ node index.js
```

## Example
If you want to separate plugins, you can place the plugin file into the plugin folder.

plugin/hello.js
```js
module.exports = function (fox) {
  fox.add(function (res) {
    if (res.text === 'hello') res.reply('world');
  });
};
```

index.js
```js
var FoxTail = require('foxtail');
var Path = require('path');

var fox = new FoxTail({
    consumer_key: ...,
    consumer_secret: ...,
    access_token: ...,
    access_token_secret: ...
});

fox.load(Path.resolve(__dirname, 'plugin'));
fox.run();
```

Very Easy!

## Response Action

### Tweet

```js
fox.add(function (res) {
    if (res.text === 'foo') res.post('bar');
});
```

### Reply

```js
fox.add(function (res) {
    if (res.text === 'hello') res.reply('world');
});
```

### Retweet

```js
fox.add(function(res) {
    if (res.screen_name === 'akameco') res.retweet();
});
```

### Favolite

```js
fox.add(function(res) {
    if (res.text === 'happy') res.favorite();
});
```

### Schedule Tweet
install node-cron

```
$ npm install cron --save
```

```js
var cron = require('cron');

var job = new cron.cronJob('0 0 0 * * *', function () {
  fox.post('hello');
}, null, false);

module.exports = function (fox) {
  fox.add(function () {
    job.start();
  });
};
```

## Development

```
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
