var allserver=require('../dao/getallserver.js')
module.exports=function(app){
    app.post('/questionDelete', (req, res) => {
        allserver.questionDelete(req,res)
    })
}