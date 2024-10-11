const fs = require('fs')
const path = require('path')
let file = path.resolve(__dirname, './.env.local')

// 打包时间
let date = new Date()
const data = `VITE_APP_BUILDTIME=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
// 异步写入数据到文件
fs.writeFile(file, data, {encoding: 'utf8'}, err => {
})