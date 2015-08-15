"use strict";

export default (fox) => {
    fox.add((res)=> {
        if (res.screen_name === 'munisystem') {
            res.retweet();
        }
    });
}
