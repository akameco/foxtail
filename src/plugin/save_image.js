"use strict";
import Path from 'path';

// 画像を保存する
export default (momo) => {
    momo.add((res) => {
        if (res.download_images(Path.resolve(__dirname, '../../img'))) {
            console.log('save done!');
        }
    });
}
