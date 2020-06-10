var userserver=require("../dao/loginserver");
module.exports=function(app){
    app.post('/userUpdate',(req,res)=>{
        userserver.updateUser(req,res); 
    })
}