var questionserver=require("../dao/getallserver");
module.exports=function(app){
    app.post('/questionUpdate',(req,res)=>{
        questionserver.updateQuestion(req,res);
    })
}