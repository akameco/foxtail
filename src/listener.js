import Response from './response';

export default class Listener {
	constructor(fox, cb) {
		this.fox = fox;
		this.cb = cb;
	}

	call(tweet) {
		this.cb(new Response(this.fox, tweet));
	}
}
