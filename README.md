# FoxTail

[![Greenkeeper badge](https://badges.greenkeeper.io/akameco/foxtail.svg)](https://greenkeeper.io/)
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
const FoxTail = require('foxtail');

const fox = new FoxTail({
    consumer_key: ...,
    consumer_secret: ...,
    access_token: ...,
    access_token_secret: ...
});

// show timeline
fox.add(res => {
    console.log("@" + res.screen_name + "(" + res.user_name + ") " + res.text + "\n");
});

// reply to words
fox.add(res => {
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
module.exports = fox => {
  fox.add(res => {
    if (res.text === 'hello') {
      res.reply('world');
    }
  });
};
```

index.js
```js
const FoxTail = require('foxtail');
const path = require('path');

const fox = new FoxTail({
    consumer_key: ...,
    consumer_secret: ...,
    access_token: ...,
    access_token_secret: ...
});

fox.load(path.resolve(__dirname, 'plugin'));
fox.run();
```

Very Easy!

## Using foxtail npm plugins
If you want to create bot more easily, You can use the npm plugins.  

This is an example.  
This plugin is that reply 'hello' to 'world' in the timeline.  
First, Install foxtail plugin.

```
$ npm install foxtail-hello-world
```

Add plugin name into json file.

fox.json
```fox.json
['foxtail-hello-world']
```

Add `loadNpmScript` to index.js.

index.js
```js
const FoxTail = require('foxtail');
const Path = require('path');

const fox = new FoxTail({
    consumer_key: ...,
    consumer_secret: ...,
    access_token: ...,
    access_token_secret: ...
});

fox.loadNpmScript(Path.resolve(__dirname, 'fox.json'));
fox.run();
```

YEAR!!!!  

## Response Action

### Tweet

```js
fox.add(res => {
    if (res.text === 'foo') {
      res.post('bar');
    }
});
```

### Reply

```js
fox.add(res => {
    if (res.text === 'hello') {
      res.reply('world');
    }
});
```

### Retweet

```js
fox.add(res => {
    if (res.screen_name === 'akameco') {
      res.retweet();
    }
});
```

### Favorite

```js
fox.add(res => {
    if (/happy/.test(res.text)) {
      res.favorite();
    }
});
```

### Schedule Tweet
install node-cron

```
$ npm install cron --save
```

```js
const cron = require('cron');

const job = new cron.cronJob('0 0 0 * * *', () => {
  fox.post('hello');
}, null, false);

module.exports = fox => {
  fox.add(() => {
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
