"use strict";

import Twitter from 'twit';
import T from './config';
import {EventEmitter} from 'events';
import Response from './response';
import Listener from './listener';
import {StreamingListTimeLine,ListTimeLine} from './timeline';

class Momonic {
    listeners = [];

    // TODO: リストのidを選択可能にする
    constructor(count = 20, list_id = 106243757) {
        this.count = count;
        this.list_id = list_id;
    }

    // リスナを登録する
    push(cb) {
        this.listeners.push(new Listener(this, cb));
    }

    // 登録されている全てのリスナを実行する
    receive(msg) {
        for (let listener of this.listeners) {
            listener.call(msg);
        }
    }

    // TODO: ファイルからプラグインのロード
    load() {
    }

    // TODO: 初期化処理
    run() {
    }
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
    for (let i of res.media) {
        console.log(i);
    }
});

// let tl = new ListTimeLine(momo);
let tl = new StreamingListTimeLine(momo);
tl.run();
