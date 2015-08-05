"use strict";

import {T} from './config';
import {EventEmitter} from 'events';

let list_id = 106243757;

let event = new EventEmitter;

event.on('data', (obj) => {
  console.log(obj);

  for (let o of obj['media']) {
    console.log(o);
  }
});

T.get('lists/statuses', {list_id: list_id, count: 20}, (err, data, response) => {
  if (err) {
    console.log(err);
  }

  for (let tweet of data) {
    if (tweet.extended_entities) {
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

      event.emit('data', obj);
    }
  }
});
