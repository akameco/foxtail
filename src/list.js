"use strict";

import {T} from './config';
import {EventEmitter} from 'events';

let event = new EventEmitter;

event.on('data', (data) => {
    for (let m of data) {
        console.log(m);
    }
    console.log("\n");
});

let list_id = 106243757;
T.get('lists/members', {list_id: list_id, count: 5000}, (err, data, response) => {

    let user_ids = data.users.map((user) => {
        return user.id;
    });

    let userStream = T.stream('statuses/filter', {follow: user_ids.join()});
    userStream.on('tweet', (tweet) => {

        // リストのユーザのツイート
        if (user_ids.indexOf(tweet.user.id) === -1) {
            return;
        }

        let obj = {};

        // 画像があるか判定
        if (tweet.extended_entities) {
            obj['name'] = tweet.user.name;
            obj['screen_name'] = tweet.user.screen_name;

            // 複数画像
            obj['media']
            for (let media of tweet.extended_entities.media) {

                str.push(media.media_url);
            }

            event.emit('data', str);
        }

    });
});
