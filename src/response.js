export default class Response {

  constructor(fox, tweet) {
    this.fox = fox
    this.tweet = tweet
  }

  get user_name() {
    return this.tweet.user.name
  }

  get screen_name() {
    return this.tweet.user.screen_name
  }

  get text() {
    return this.tweet.text
  }

  get images() {
    let images = []
    // 複数画像
    if (this.tweet.extended_entities) {
      for (let m of this.tweet.extended_entities.media) {
        images.push(m.media_url)
      }
    }
    return images
  }

  post(msg) {
    this.fox.action.post(msg)
  }

  reply(msg) {
    this.fox.action.reply(this.tweet, msg)
  }

  retweet() {
    this.fox.action.retweet(this.tweet)
  }

  favorite() {
    this.fox.action.favorite(this.tweet)
  }

  downloadImages(path, cb) {
    this.fox.action.downloadImages(this.images, this.tweet, path, cb)
  }
}
