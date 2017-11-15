const mysql = require('../server/sql')

exports.getAdmin = function (req, res, next) {
  var sqlStr = 'SELECT * FROM websites'
  mysql.find(sqlStr, function (errMsg, result) {
    let data = {}
    if (errMsg) {
      data = {
        'code': -1,
        'msg': '查询数据失败！',
        'data': null
      }
    } else {
      data = {
        'code': 0,
        'data': result,
        'msg': '成功'
      }
    }
    res.json(data)
  })
}
