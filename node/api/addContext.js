var allserver=require('../dao/getallserver.js')
module.exports=function(app){
    app.post('/addContext', (req,res) => {
        allserver.addContext(req,res)
    })
}