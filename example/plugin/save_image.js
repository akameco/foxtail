import Path from 'path'

// 画像を保存する
export default (fox) => {
  fox.add((res) => {
    if (res.downloadImages(Path.resolve(__dirname, '../../img'))) {
      console.log('save done!')
    }
  })
}
