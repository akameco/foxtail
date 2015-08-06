import fs from 'fs';
import http from 'http';

export default (momo) => {
    let i = 1;
    momo.add((res) => {
        for (let image of res.media) {
            let outFile = fs.createWriteStream(i++ + '.jpg');
            console.log('saving image ...');

            let url = image;

            let req = http.get(url, (res) => {
                // ダウンロードした内容をそのまま、ファイル書き出し。
                res.pipe(outFile);
                // 終わったらファイルストリームをクローズ。
                res.on('end', function () {
                    outFile.close();
                });
            });

            req.on('error', (err) => {
                console.log('Error: ', err);
                return;
            });
        }
    });
}
