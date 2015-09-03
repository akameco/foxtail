export default (fox) => {
  fox.add((res) => {
    if (res.screen_name === 'akameco') {
      res.favorite()
    }
  })
}
