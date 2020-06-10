var allserver=require('../dao/getallserver.js')
module.exports=function(app){
    app.get('/total', (req,res) => {
        allserver.gettotal(req,res)
    })
}