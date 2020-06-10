var allserver=require('../dao/getallserver.js')
module.exports=function(app){
    app.post('/all', (req,res) => {
        allserver.getall(req,res)
    })
}