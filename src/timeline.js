import {EventEmitter} from 'events'

export class TimeLine extends EventEmitter {
  constructor(fox) {
    super()
    this.fox = fox
    this.twitter = this.fox.twitter
  }

  // 画像のないツイートを取り除く
  filter(tweet) {
    return tweet.extended_entities ? true : false
  }

  run() {
  }
}

export class ListTimeLine extends TimeLine {
  constructor(fox, {list_id = 106243757, count = 50}) {
    super(fox)
    this.list_id = list_id
    this.count = count
  }

  run() {
    this.twitter.get('lists/statuses',
          {list_id: this.list_id, count: this.count}, (err, data) => {
            if (err) {
              throw new Error(err)
            }

            for (let tweet of data) {
              if (!this.filter(tweet)) continue
              this.fox.receive(tweet)
            }
          })
  }
}

export class StreamingListTimeLine extends TimeLine {
  constructor(fox, {list_id = 106243757}) {
    super(fox)
    this.list_id = list_id
  }

  // TODO: ネストを浅くする
  run() {
    this.twitter.get('lists/members', {list_id: this.list_id, count: 5000}, (err, data) => {
      let user_ids = data.users.map((user) => {
        return user.id
      })

      let userStream = this.twitter.stream('statuses/filter', {follow: user_ids.join()})

      userStream.on('tweet', (tweet) => {
        // RTされたツイート及び画像のないツイートを取り除く
        if (this.filter(tweet) && user_ids.indexOf(tweet.user.id) !== -1) {
          this.fox.receive(tweet)
        }
      })
    })
  }
}

export class PublicTimeLine extends TimeLine {
  run() {
    let userStream = this.twitter.stream('user')
    userStream.on('tweet', (tweet) => {
      this.fox.receive(tweet)
    })
  }
}
