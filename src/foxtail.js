import Fs from 'fs'
import Path from 'path'
import Twitter from 'twit'
import Listener from './listener'
import Action from './action'
import {PublicTimeLine} from './timeline'

export default class FoxTail {

  constructor(config) {
    this.listeners = []
    this.twitter = new Twitter(config)
    this.action = new Action(this)
    this.setTimeline(PublicTimeLine)
  }

  get twit() {
    return this.twitter
  }

  /**
   * タイムラインをセット
   * @param timeline
   * @param options
   * @private
   */
  setTimeline(timelineClass, options) {
    this.timeline = new timelineClass(this, options)
  }

  /**
   * ツイッターに投稿する
   * @param msg
   */
  post(msg) {
    this.action.post(msg)
  }

  /**
   * リスナを登録する
   * @param cb
   */
  add(cb) {
    this.listeners.push(new Listener(this, cb))
  }

  /**
   * 登録されている全てのリスナを実行する
   * @param tweet
   */
  receive(tweet) {
    for (let listener of this.listeners) {
      listener.call(tweet)
    }
  }

  // TODO 処理を分割
  /**
   * プラグインの読み込み
   * @param path
   */
  load(path) {
    if (Fs.existsSync(path)) {
      Fs.readdir(path, (err, list) => {
        for (let file of list) {
          this.loadScript(path, file)
        }
      })
    } else {
      console.log('Could not read file')
      process.exit(1)
    }
  }

  /**
   * プラグインを読み込む
   * @param path
   * @param file
   */
  loadScript(path, file) {
    const ext = Path.extname(file)
    const full = Path.join(path, Path.basename(file, ext))
    try {
      const script = require(full)
      if (typeof script === 'function') {
        script(this)
      }
    } catch (e) {
      console.log('Error' + e)
    }
  }

  /**
   * npm プラグインの読み込み
   */
  loadNpmScript(path) {
    const data = require(path)
    data.forEach((script) => {
      require(script)(this)
    })
  }

  /**
   * 実行
   */
  run() {
    this.timeline.run()
  }
}
