var loginserver=require('../dao/loginserver.js')
module.exports=function(app){
    app.post('/usernameCheck', (req, res) => {
        loginserver.usernameCheck(req,res)
    })
}