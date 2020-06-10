var dbmodel=require('../model/loginmodel.js');
var User=dbmodel.model('user');

//登录
exports.userlogin=function(req,res){
    let username=req.body.username;
    let password=req.body.password;
    User.find({username:username,password:password}).then(value=>{
        res.send(value);
        
    })
  }
//注册      
exports.register=function(req,res){
    let username=req.body.username;
    let password=req.body.password;
    let name=req.body.name;
    let obj=new User({
        username:username,
        password:password,
        name:name
    });
    obj.save(function(err){
        if(err)res.send("error");
        else res.send("success")
    })
}
//用户名验证重名
exports.usernameCheck=function(req,res){
    let username=req.body.username;
    User.find({username:username}).countDocuments().then(value=>{
        if(value==0)res.send("success");
        else res.send("error");
    })
}
//昵称验证重名
exports.nameCheck=function(req,res){
    let name=req.body.name; 
    User.find({name:name}).countDocuments().then(value=>{
        if(value==0)res.send("success");
        else res.send("error");
    })
}
//修改用户名密码和昵称等
exports.updateUser=function(req,res){
    let name=req.body.name;
    let prename=req.body.prename;
    let username=req.body.username;
    let password=req.body.password; 
    User.updateMany({name:prename},{name:name,username:username,password:password},function(err){
        if(err)res.send("error");
        else res.send("success");
    })
}
