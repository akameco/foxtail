/* eslint-disable camelcase */
import {EventEmitter} from 'events';

export class TimeLine extends EventEmitter {
	constructor(fox) {
		super();
		this.fox = fox;
		this.twitter = this.fox.twitter;
	}

	run() { }
}

export class ListTimeLine extends TimeLine {
	constructor(fox, {list_id = 106243757, count = 50}) {
		super(fox);
		this.list_id = list_id;
		this.count = count;
	}

	run() {
		this.twitter.get('lists/statuses', {
			list_id: this.list_id,
			count: this.count
		}, (err, data) => {
			if (err) {
				throw new Error(err);
			}

			for (const tweet of data) {
				this.fox.receive(tweet);
			}
		});
	}
}

export class StreamingListTimeLine extends TimeLine {
	constructor(fox, {list_id = 106243757}) {
		super(fox);
		this.list_id = list_id;
	}

	run() {
		this.twitter.get('lists/members', {list_id: this.list_id, count: 5000}, (_, data) => {
			const user_ids = data.users.map(user => {
				return user.id;
			});

			const userStream = this.twitter.stream('statuses/filter', {follow: user_ids.join()});

			userStream.on('tweet', tweet => {
				if (user_ids.indexOf(tweet.user.id) !== -1) {
					this.fox.receive(tweet);
				}
			});
		});
	}
}

export class PublicTimeLine extends TimeLine {
	run() {
		const userStream = this.twitter.stream('user');
		userStream.on('tweet', tweet => {
			this.fox.receive(tweet);
		});
	}
}
