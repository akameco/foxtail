"use strict";

import Twitter from 'twit';
import {EventEmitter} from 'events';

export let T = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

class Timeline extends EventEmitter {
  constructor (momo) {
    super();
    this.momo = momo;
    this.count = this.momo.count;
    this.list_id = this.momo.list_id;
  }

  // 画像のないツイートを取り除く
  filter(tweet) {
    return tweet.extended_entities ? true : false;
  }

  // TODO: ツイートのjsonを整形せずそのまま渡す
  // ツイートオブジェクトを整形し新しいObjectとして渡す
  formatTweet(tweet) {
    let obj = {
      id: tweet.id,
      user_id: tweet.user.id,
      username: tweet.user.name,
      screen_name: tweet.user.screen_name,
      text: tweet.text,
      media: []
    };

    // 複数画像
    for (let media of tweet.extended_entities.media) {
      obj['media'].push(media.media_url);
    }

    return obj;
  }

  run() {}
}

class ListTimeline extends Timeline {
  constructor (momo) {
    super(momo);
  }

  run() {
    T.get('lists/statuses', {list_id: this.list_id, count: this.count}, (err, data, response) => {
      if (err) {
        console.log(err);
      }

      for (let tweet of data) {
        if(!this.filter(tweet)) continue;
        this.momo.receive(this.formatTweet(tweet));
      }
    });
  }
}

// イベントが発生時に呼べれるリスナ
class Listener {
  // momo メイン
  // cb コールバック関数
  constructor(momo, cb) {
    this.momo = momo;
    this.cb = cb;
  }

  call(msg) {
    this.cb(new Response(this.momo, msg));
  }
}

// レスポンスクラス
// イベントが発生すると作られる
class Response {
  constructor (momo, msg) {
    this.momo = momo;
    this.msg = msg;
  }

  get username() {
    return this.msg.username;
  }

  get text() {
    return this.msg.text;
  }

  get media() {
    return this.msg.media;
  }
}

// メイン関数
class Momonic {
  listeners = [];

  // TODO: リストのidを選択可能にする
  constructor (count = 20, list_id = 106243757) {
    this.count = count;
    this.list_id = list_id;
  }

  // リスナを登録する
  push(cb) {
    this.listeners.push(new Listener(this, cb));
  }

  // 登録されている全てのリスナを実行する
  receive(msg) {
    for(let listener of this.listeners) {
      listener.call(msg);
    }
  }

  // TODO: ファイルからプラグインのロード
  load() { }
  run() { }
}

let momo = new Momonic();

// リスナを登録

// momo.push((res) => {
  // console.log(res.msg);
// });

momo.push((res) => {
  console.log(res.username);
});

momo.push((res) => {
  for(let i of res.media) {
    console.log(i);
  }
});

let tl = new ListTimeline(momo);

// tl.on('tweet', (data) => {
  // console.log(`@${data.screen_name}`);
  // console.log(data.text);
  // for (let o of data['media']) {
    // console.log(o);
  // }
// });

tl.run();
