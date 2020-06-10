var db=require('../config/db.js')
var mongoose=require('mongoose')

var Schema=mongoose.Schema;
var UserSchema=new Schema({
    username:String,
    password:String,
    name:String
});
module.exports=db.model('user',UserSchema);