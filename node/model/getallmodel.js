var db = require('../config/db.js')
var mongoose = require('mongoose')

var Schema = mongoose.Schema;
var QuestionSchema = new Schema({
    pagenum: Number,
    title: String,
    writer: String,
    date: String,
    describe: String,
    context:Array
});
module.exports = db.model('question', QuestionSchema);