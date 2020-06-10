var allserver=require('../dao/getallserver.js')
module.exports=function(app){
    app.post('/question', (req,res) => {
        allserver.getContext(req,res)
    })
}