// イベントが発生時に呼べれるリスナ

import Response from './response';

export default class Listener {
    // momo メイン
    // cb コールバック関数
    constructor(momo, cb) {
        this.momo = momo;
        this.cb = cb;
    }

    call(tweet) {
        this.cb(new Response(this.momo, tweet));
    }
}
