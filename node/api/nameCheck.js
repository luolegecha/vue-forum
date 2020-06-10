var loginserver=require('../dao/loginserver.js')
module.exports=function(app){
    app.post('/nameCheck', (req, res) => {
        loginserver.nameCheck(req,res)
    })
}