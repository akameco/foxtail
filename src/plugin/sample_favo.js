"use strict";

export default (momo) => {
    momo.add((res) => {
        if (res.screen_name === 'akameco') {
            res.favorite()
        }
    });
}
