import {cronJob} from 'cron'
let job = new cronJob('0 0 0 * * *', () => {
    fox.post('ラーメン...')
}, null, false)

module.exports = (fox) => {
  fox.add(() => {
    job.start()
  })
}
