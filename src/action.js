"use strict";
import T from './config';
import Fs from 'fs';
import Path from 'path';
import Request from 'request';
import Url from 'url';

export default class Action {

    constructor(momo) {
        this.momo = momo;
    }

    // TODO 各アクションの実装
    // ポストする
    post(msg) {
    }

    // 相手にリプライを返す
    // TODO ログ
    reply(tweet, msg) {
        T.post('statuses/update', {
            in_reply_to_status_id: tweet.id_str,
            status: `@${tweet.user.screen_name} ${msg}`
        }, (err, data) => {
            console.log(data)
        });
    }

    retweet(tweet) {
        T.post('statuses/retweet/:id', {id: tweet.id_str}, (err, data)=> {
            console.log(data);
        });
    }

    favorite(tweet) {
        T.post('favorites/create', {id: tweet.id_str}, (err, data)=> {
            console.log(data);
        });
    }

    // TODO optionを設定して
    // パスの場所に画像を保存する
    download_images(images, tweet, path, option = {}) {
        if (images.length === 0) {
            return false;
        }

        for (let image_url of images) {
            let filename = Path.basename(Url.parse(image_url).pathname);
            let save_path = Path.join(path, filename);
            Request(image_url)
                .pipe(Fs.createWriteStream(save_path))
                .on('close', ()=> {
                    // TODO ログ
                    console.log('image saved');
                });
        }
        return true;
    }
}
