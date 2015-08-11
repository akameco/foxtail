# FoxTail

みこーん。

Twitter BOT for node.  
You can easily add plugin.

## Installation

```
npm install foxtail
```

Requirements:
- babel


## Example

### 1. Add plugin

```
$ echo '["nullpo"]' > scripts.json
$ mkdir plugin
```

plugin/nullpo.js

```js
export default (fox) => {
    fox.add((res) => {
        if (res.text === 'ぬるぽ') {
            fox.reply('ガッ');
        }
    });
}
```

### 2. Setup FoxTail.

main.js

```js
import FoxTail from 'foxtail'
let fox = new FoxTail();
fox.run();
```

### 3. Run

```
$ babel-node --stage 0 -- main.js
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
