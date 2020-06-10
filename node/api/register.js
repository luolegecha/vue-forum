var loginserver=require('../dao/loginserver.js')
module.exports=function(app){
    app.post('/register', (req, res) => {
        loginserver.register(req,res)
    })
}