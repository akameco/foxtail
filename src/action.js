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
}
