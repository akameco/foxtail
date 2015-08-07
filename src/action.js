"use strict";
import T from './config';

export default class Action {

    constructor(momo) {
        this.momo = momo;
    }

    // TODO: 各アクションの実装
    // ポストする
    post(msg) {
    }

    // 相手にリプライを返す
    // TODO: ログ
    reply(tweet, msg) {
        T.post('tatuses/update', {
            in_reply_to_status_id: tweet.id_str,
            status: `@${tweet.user.screen_name} ${msg}`
        }, (err, data, res) => {
            console.log(data)
        });
    }

    retweet(tweet) {
    }

    favo(tweet) {
    }

    download(path) {
    }

}
