const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')



/**
 *
 * 公共系统初始化
 *
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.use(require('cors')());
// 设置跨域和相应数据格式
app.all('/api/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
  })


require('./api/login.js')(app);
require('./api/register.js')(app);
require('./api/usernameCheck.js')(app);
require('./api/nameCheck.js')(app);
require('./api/allquestion.js')(app);
require('./api/gettotal.js')(app);
require('./api/insertQuestion.js')(app);
require('./api/myQuestion.js')(app);
require('./api/question.js')(app);
require('./api/addContext.js')(app);
require('./api/titleCheck.js')(app);
require('./api/questionDelete.js')(app);
require('./api/updateQuestion.js')(app);
require('./api/updateUser.js')(app);
app.get('/', (req, res) => res.send('Hello World!'))




app.listen(port, () => console.log(`Example app listening on port ${port}!`))