var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'lin_test'
})

// 查询
exports.find = function (sqlStr, callback) {
  connection.connect()
  connection.query(sqlStr, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      callback(err, result)
      return
    }

    console.log('--------------------------SELECT----------------------------')
    console.log(result)
    console.log('------------------------------------------------------------\n\n')
    // 将RowDataPacket对象装化成json字符串
    let res = JSON.stringify(result)
    console.log(res)
    callback(err, JSON.parse(res))
  })

  connection.end()
}
