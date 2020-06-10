var loginserver=require('../dao/loginserver.js')
module.exports=function(app){
    app.post('/login', (req, res) => {
        loginserver.userlogin(req,res)
    })
}
