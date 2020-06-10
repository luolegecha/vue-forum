var dbmodel = require('../model/getallmodel.js');
var Question = dbmodel.model('question');
//获取所有的问题，带分页功能
exports.getall = function (req, res) {
    const pagenum = req.body.pagenum;
    const pagesize = req.body.pagesize;
    const num = 1 + pagesize * (pagenum - 1);
    Question.find({ pagenum: { $gte: num, $lt: (num + pagesize) } }).then(value => {
        res.send(value);
    }).catch(function (err) {
        console.log(err);
    })
}//,pagenum:}
//获取总条数
exports.gettotal = function (req, res) {
    Question.find().countDocuments().then(value => {
        res.send(value.toString());
    });
}
//插入新的问题
exports.insertQuestion = function (req,res) {
    let title = req.body.title;
    let pagenum = req.body.pagenum;
    let writer = req.body.writer;
    let describe = req.body.describe;
    let date = req.body.date;
    let context=new Array();
    var newInsert = new Question({
        pagenum: pagenum,
        title: title,
        writer: writer,
        date: date,
        describe: describe,
        context:context
    });
    newInsert.save(function (err) {
        if (err) res.send("error");
        else{res.send("success");}
    })
}
//查看自己的所有问题
exports.myQuestion = function (req,res) {
    let name = req.body.name;
    
    Question.find({writer:name}).then(value=>{
        res.send(value);
    })
}
//获取某一个问题的评论
exports.getContext = function (req,res) {
    let title = req.body.title;
    Question.find({title:title}).then(value=>{
        res.send(value);
    })
}
//添加一个评论
exports.addContext = function (req,res) {
    let title = req.body.title;
    let writer = req.body.writer;
    let message = req.body.message;
    let date = req.body.date;
    let index=req.body.index;
    let obj={
        writer:writer,
        message:message,
        date:date,
        index:index
    }
    Question.updateMany({title:title},{'$addToSet':{'context':obj}},function(err){
        if(err)res.send("error");
        else res.send("success");
    })
    
}
//题目验证重名
exports.titleCheck=function(req,res){
    let title=req.body.title; 
    Question.find({title:title}).countDocuments().then(value=>{
        if(value==0)res.send("success");
        else res.send("error");
    })
}
//删除某个问题
exports.questionDelete=function(req,res){
    let title=req.body.title;
    let pagenum=req.body.pagenum;
    //删除某个问题前需要把分页用的序号也进行操作，以防止分页混乱，即将删除问题之后的所有问题的pagenum自减1
    Question.updateMany({pagenum:{$gt:pagenum}},{ $inc: { pagenum: -1}}).then();
    Question.deleteOne({title:title},function(err){
        if(err){res.send("error");return;}
        else res.send("success");return;
    })
}
//当作者信息修改后修改他的问题下的作者名
exports.updateQuestion=function(req,res){
    let writer=req.body.writer;
    let prename=req.body.prename; 
    Question.updateMany({writer:prename},{writer:writer},function(err){
        if(err)res.send("error");
        else res.send("success");
    })
}