// レスポンスクラス
// イベントが発生すると作られる

export default class Response {
    constructor(momo, msg) {
        this.momo = momo;
        this.msg = msg;
    }

    get username() {
        return this.msg.username;
    }

    get text() {
        return this.msg.text;
    }

    get media() {
        return this.msg.media;
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
