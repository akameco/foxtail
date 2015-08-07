"use strict";

export default (momo) => {
    momo.add((res)=> {
        if (res.screen_name === 'munisystem') {
            res.retweet();
        }
    });
}
