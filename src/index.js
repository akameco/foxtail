import Twitter from 'twit';

let config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

let T = new Twitter(config);

let userStream = T.stream('user');
uerStream.on('tweet', (tweet) => {
    console.log(tweet.text)
});
