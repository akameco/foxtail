import FoxTail from '../lib/foxtail'
import Path from 'path'

const config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
}

let fox = new FoxTail(config)
fox.load(Path.resolve(__dirname, 'plugin'))
fox.run()
