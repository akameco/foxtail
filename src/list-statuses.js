"use strict";

import {T} from './config';

//T.get('lists/list', {screen_name: screen_name, reverse: true}, (err, data, response) => {
//
//    if (err) {
//        console.log(err);
//    }
//
//    for (let list of data) {
//        if (list.name === '絵師') {
//            list_id = list.id;
//        }
//    }
//});

let list_id = 106243757;

T.get('lists/statuses', {list_id: list_id, count: 20}, (err, data, response) => {
    if (err) {
        console.log(err);
    }

    for (let tweet of data) {
        if (tweet.extended_entities) {

            console.log(tweet.extended_entities.media.length);

            console.log(`${tweet.user.name}(@${tweet.user.screen_name}) ${tweet.text}`);

            // 複数画像
            for (let media of tweet.extended_entities.media) {
                console.log(media.media_url)
            }

            console.log("\n");
        }
    }

});
