"use strict";

import Fs from 'fs';
import Path from 'path';
import Twitter from 'twit';
import T from './config';
import Response from './response';
import Listener from './listener';
import Action from './action';
import {StreamingListTimeLine,ListTimeLine,PublicTimeLine} from './timeline';

export default class FoxTail {
    listeners = [];
    timelineTable = {
      "public": PublicTimeLine,
      "list": StreamingListTimeLine
    };

    // TODO: リストのidを選択可能にする
    constructor(timeline = 'public', count = 50, list_id = 106243757) {
        this.count = count;
        this.list_id = list_id;
        this.action = new Action(this);
        // TODO: タイムラインの決定を柔軟に
        this.timeline = new this.timelineTable[timeline](this);
        this.load();
    }

    get twit() {
      return T;
    }

    // リスナを登録する
    add(cb) {
        this.listeners.push(new Listener(this, cb));
    }

    // 登録されている全てのリスナを実行する
    receive(tweet) {
        for (let listener of this.listeners) {
            listener.call(tweet);
        }
    }

    // TODO 処理を分割
    load() {
        let loadScripts = Path.resolve('.', 'scripts.json');
        let scripts = [];
        if (Fs.existsSync(loadScripts)) {
            // TODO 非同期読み込み
            let data = Fs.readFileSync(loadScripts);
            try {
                scripts = JSON.parse(data);
            } catch (e) {
                process.exit(0);
            }
        }

        let path = Path.resolve(__dirname, './plugin');
        Fs.readdir(path, (err, list) => {
            for (let file of list) {
                if (scripts.indexOf(Path.basename(file, '.js')) !== -1) {
                    this.loadScript(path, file);
                }
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
        this.timeline.run();
    }
}
