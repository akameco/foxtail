import Twitter from 'twit';

let T = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


let list_id = null;

//T.get('lists/list', {screen_name: 'akameco', reverse: true}, (err, data, response) => {
//    if (err) {
//        console.log(err);
//    }
//    for (let list of data) {
//        if (list.name === '絵師') {
//            list_id = list.id;
//        }
//    }
//});

list_id = 106243757;

T.get('lists/members', {list_id: list_id, count: 500}, (err, data, response) => {
    console.log(data);

    let user_ids = [];

    for (let user of data.users) {
        console.log(user.name);
        console.log(user.id);
        user_ids.push(user.id);
    }

    for (let id of user_ids) {
        console.log(id);
    }
    console.log(user_ids.length);

    let userStream = T.stream('statuses/filter', {follow: user_ids.join()});
    userStream.on('tweet', (tweet) => {
        console.log(tweet.text)
    });
});
