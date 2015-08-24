// イベントが発生時に呼べれるリスナ
import Response from './response'

export default class Listener {
  // fox メイン
  // cb コールバック関数
  constructor(fox, cb) {
    this.fox = fox
    this.cb = cb
  }

  call(tweet) {
    this.cb(new Response(this.fox, tweet))
  }
}
