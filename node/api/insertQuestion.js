var allserver=require('../dao/getallserver.js')
module.exports=function(app){
    app.post('/insert', (req,res) => {
        allserver.insertQuestion(req,res)
    })
}