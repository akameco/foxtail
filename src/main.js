"use strict";

import Fs from 'fs';
import Path from 'path';
import Twitter from 'twit';
import T from './config';
import Response from './response';
import Listener from './listener';
import {StreamingListTimeLine,ListTimeLine} from './timeline';

class Momonic {
    listeners = [];

    // TODO: リストのidを選択可能にする
    constructor(count = 50, list_id = 106243757) {
        this.count = count;
        this.list_id = list_id;
        this.load();
    }

    // リスナを登録する
    add(cb) {
        this.listeners.push(new Listener(this, cb));
    }

    // 登録されている全てのリスナを実行する
    receive(msg) {
        for (let listener of this.listeners) {
            listener.call(msg);
        }
    }

    load() {
        let path = Path.resolve(__dirname, './plugin');
        Fs.readdir(path, (err, list) => {
            for (let file of list) {
                this.loadScript(path, file);
            }
        });
    }

    loadScript(path, file) {
        let ext = Path.extname(file);
        let full = Path.join(path, Path.basename(file, ext));
        try {
            let script = require(full);
            if (typeof script === 'function') {
                script(this);
            }
        } catch (e) {
            console.log('Error' + e);
        }
    }

    // TODO: 初期化処理
    run() {
    }
}

let momo = new Momonic();

// let tl = new ListTimeLine(momo);
let tl = new StreamingListTimeLine(momo);
tl.run();
