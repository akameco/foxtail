"use strict";

export default (momo) => {
    momo.add((res) => {
        if (res.text === 'ぬるぽ') {
            res.reply('がっ');
        }
    });
}
