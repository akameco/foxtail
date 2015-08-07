'use strict';

import Twitter from 'twit';
import T from './config';
import {EventEmitter} from 'events';

export class TimeLine extends EventEmitter {
    constructor(momo) {
        super();
        this.momo = momo;
        this.count = this.momo.count;
        this.list_id = this.momo.list_id;
    }

    // 画像のないツイートを取り除く
    filter(tweet) {
        return tweet.extended_entities ? true : false;
    }

    run() {
    }
}

export class ListTimeLine extends TimeLine {
    run() {
        T.get('lists/statuses', {list_id: this.list_id, count: this.count}, (err, data, response) => {
            if (err) {
                console.log(err);
            }

            for (let tweet of data) {
                if (!this.filter(tweet)) continue;
                this.momo.receive(tweet);
            }
        });
    }
}

export class StreamingListTimeLine extends TimeLine {
    // TODO: ネストを浅くする
    run() {
        T.get('lists/members', {list_id: this.list_id, count: 5000}, (err, data, response) => {
            let user_ids = data.users.map((user) => {
                return user.id;
            });

            let userStream = T.stream('statuses/filter', {follow: user_ids.join()});

            userStream.on('tweet', (tweet) => {
                // RTされたツイート及び画像のないツイートを取り除く
                if (this.filter(tweet) && user_ids.indexOf(tweet.user.id) !== -1) {
                    this.momo.receive(tweet);
                }
            });
        });
    }
}

export class PublicTimeLine extends TimeLine {
    run() {
        let userStream = T.stream('user');
        userStream.on('tweet', (tweet) => {
            // RTされたツイート及び画像のないツイートを取り除く
            //if (this.filter(tweet)) {
            this.momo.receive(tweet);
            //}
        });
    }
}
