export default (fox) => {
  fox.add((res) => {
    let name = res.user_name
    let screen_name = res.screen_name
    let text = res.text
    console.log(`@${screen_name}(${name}) ${text}\n`)
  })
}
