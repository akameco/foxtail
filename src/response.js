// レスポンスクラス
// イベントが発生すると作られる

export default class Response {

    constructor(momo, tweet) {
        this.momo = momo;
        this.tweet = tweet;
    }

    get username() {
        return this.tweet.user.name;
    }

    get screen_name() {
        return this.tweet.user.screen_name;
    }

    get text() {
        return this.tweet.text;
    }

    get media() {
        let images = [];
        // 複数画像
        if (this.tweet.extended_entities) {
            for (let m of tweet.extended_entities.media) {
                images.push(m.media_url);
            }
        }
        return images;
    }

    // TODO: 各アクションの実装
    reply() {
    }

    retweet() {
    }

    favo() {
    }

    download(path) {
    }
}
