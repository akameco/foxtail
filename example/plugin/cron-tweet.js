var cronJob = require('cron').CronJob;
var job = new cronJob('0 0 0 * * *', function () {
    fox.post('ラーメン...');
}, null, false);

module.exports = function (fox) {
    fox.add(function (res) {
        job.start();
    });
};