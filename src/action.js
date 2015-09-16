import Fs from 'fs'
import Path from 'path'
import Request from 'request'
import Url from 'url'

export default class Action {

  constructor(fox) {
    this.fox = fox
    this.twitter = fox.twitter
  }

  /**
   * Twitterに投稿する
   * Twit#post('statues/update', {status: msg})
   * @param msg
   */
  post(msg) {
    this.twitter.post('statuses/update', {
      status: msg
    }, () => { })
  }

  // 相手にリプライを返す
  // TODO ログ
  /**
   * リプライを返す
   * @param tweet
   * @param msg
   */
  reply(tweet, msg) {
    this.twitter.post('statuses/update', {
      in_reply_to_status_id: tweet.id_str,
      status: `@${tweet.user.screen_name} ${msg}`
    }, () => { })
  }

  /**
   * リツイートする
   * @param tweet
   */
  retweet(tweet) {
    this.twitter.post('statuses/retweet/:id', {id: tweet.id_str}, ()=> { })
  }

  /**
   * ふぉぼる
   * @param tweet
   */
  favorite(tweet) {
    this.twitter.post('favorites/create', {id: tweet.id_str}, ()=> { })
  }

  // TODO 保存する画像のファイル名を任意に設定可能にする
  /**
   * 対象のパスに画像を保存する
   * @param images
   * @param tweet
   * @param path
   * @param cb
   */
  downloadImages(images, tweet, path, cb) {
    if (images.length === 0) {
      return
    }

    for (let image_url of images) {
      let filename = Path.basename(Url.parse(image_url).pathname)
      let savePath = Path.join(path, filename)
      Request(image_url)
      .pipe(Fs.createWriteStream(savePath))
      .on('close', ()=> {
        if (typeof cb === 'function') {
          cb(savePath)
        }
      })
    }
  }
}
