"use strict";

import {T} from './config';


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

        // 画像があるか判定
        if (tweet.entities.media) {

            console.log(`${tweet.user.name}(@${tweet.user.screen_name}) ${tweet.text}`);

            console.log(tweet.entities.media.length);

            // 複数画像
            for (let media of tweet.entities.media) {
                console.log(media)
            }
            console.log("\n");
        }

    });
});
