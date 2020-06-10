var allserver=require('../dao/getallserver.js')
module.exports=function(app){
    app.post('/titleCheck', (req, res) => {
        allserver.titleCheck(req,res)
    })
}