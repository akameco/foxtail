'use strict';
const Response = require('./response');

class Listener {
	constructor(fox, cb) {
		this.fox = fox;
		this.cb = cb;
	}

	call(tweet) {
		this.cb(new Response(this.fox, tweet));
	}
}

module.exports = Listener;
