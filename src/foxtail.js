import Fs from 'fs'
import Path from 'path'
import Twitter from 'twit'
import T from './config'
import Listener from './listener'
import Action from './action'
import {StreamingListTimeLine,ListTimeLine,PublicTimeLine} from './timeline'

export default class FoxTail {
  /**
   * プラグインを発火するリスナ
   * @type {Array}
   */
  listeners = []

  /**
   * タイムラインを選択する
   * @param timeline
   * @param options
   */
  constructor(timeline = 'public', options = {}) {
    this.action = new Action(this)
    this._setTimeline(timeline, options)
  }

  setConfig(config) {
    T = new Twitter(config)
  }

  get twit() {
    return T
  }

  /**
   * タイムラインをセット
   * @param timeline
   * @param options
   * @private
   */
  _setTimeline(timeline, options) {
    let timelineTable = {
      'public': PublicTimeLine,
      'stream/list': StreamingListTimeLine,
      'list': ListTimeLine
    }
    this.timeline = new timelineTable[timeline](this, options)
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
    let ext = Path.extname(file)
    let full = Path.join(path, Path.basename(file, ext))
    try {
      let script = require(full)
      if (typeof script === 'function') {
        script(this)
      }
    } catch (e) {
      console.log('Error' + e)
    }
  }

  /**
   * 実行
   */
  run() {
    this.timeline.run()
  }
}
