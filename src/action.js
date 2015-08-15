"use strict";
import T from './config';
import Fs from 'fs';
import Path from 'path';
import Request from 'request';
import Url from 'url';

export default class Action {

    constructor(fox) {
        this.fox = fox;
    }

    /**
     * Twitterに投稿する
     * Twit#post('statues/update', {status: msg})
     * @param msg
     */
    post(msg) {
        T.post('statuses/update', {
            status: msg
        }, (err, data) => {
        });
    }

    // 相手にリプライを返す
    // TODO ログ
    /**
     * リプライを返す
     * @param tweet
     * @param msg
     */
    reply(tweet, msg) {
        T.post('statuses/update', {
            in_reply_to_status_id: tweet.id_str,
            status: `@${tweet.user.screen_name} ${msg}`
        }, (err, data) => {
        });
    }

    /**
     * リツートをする
     * @param tweet
     */
    retweet(tweet) {
        T.post('statuses/retweet/:id', {id: tweet.id_str}, (err, data)=> {
        });
    }

    /**
     * ふぉぼる
     * @param tweet
     */
    favorite(tweet) {
        T.post('favorites/create', {id: tweet.id_str}, (err, data)=> {
        });
    }

    // TODO optionを設定して
    /**
     * 対象のパスに画像を保存する
     * @param images
     * @param tweet
     * @param path
     * @param option
     * @returns {boolean}
     */
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
