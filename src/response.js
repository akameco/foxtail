'use strict';

class Response {
	constructor(fox, tweet) {
		this.fox = fox;
		this.tweet = tweet;
	}

	get userName() {
		return this.tweet.user.name;
	}

	get screenName() {
		return this.tweet.user.screen_name;
	}

	get text() {
		return this.tweet.text;
	}

	post(msg) {
		this.fox.action.post(msg);
	}

	reply(msg) {
		this.fox.action.reply(this.tweet, msg);
	}

	retweet() {
		this.fox.action.retweet(this.tweet);
	}

	favorite() {
		this.fox.action.favorite(this.tweet);
	}
}

module.exports = Response;
