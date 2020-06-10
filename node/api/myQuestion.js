var allserver=require('../dao/getallserver.js')
module.exports=function(app){
    app.post('/myquestion', (req,res) => {
        allserver.myQuestion(req,res)
    })
}