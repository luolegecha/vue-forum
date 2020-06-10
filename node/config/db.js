var mongoose=require('mongoose');
if(mongoose.connection.readyState!==0){
  next();
  return;
}
mongoose.connect('mongodb://localhost:27017/luntan', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}, function(err){

  　　if(err){
  
  　　　　console.log('Connection Error:' + err)
  
  　　}else{
  
  　　　　console.log('Connection success!')
  
  　　}
  
  });
  var db=mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

module.exports=db;
