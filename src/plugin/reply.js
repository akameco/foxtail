"use strict";
import T from '../config';

export default (momo) => {
    momo.add((res) => {
        if (res.screen_name === 'akameco' && res.text === 'ぬるぽ') {
            T.post('statuses/update', {
                in_reply_to_status_id: res.tweet.id_str,
                status: '@' + res.screen_name + ' ガッ'
            }, (err, data, res) => {
                console.log(data)
            });
        }
    });
}
