"use strict";
import Fs from 'fs';
import Path from 'path';
import url from 'url';
import request from 'request';

// 画像を保存する
export default (momo) => {
    momo.add((res) => {
        for (let image_url of res.media) {
            console.log(`saving ${res.username}'s image`);

            let filename = url.parse(image_url).pathname.split('/').pop();
            let save_path = Path.join('./img', filename);

            request(image_url).pipe(Fs.createWriteStream(save_path)).on('close', ()=> {
                console.log(`${res.username}'s image saved`);
            });
        }
    });
}
