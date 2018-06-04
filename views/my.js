var exp=require('express')
var app=exp();
app.use(express.static('public'))
var database=require('nedb')
var db=new database({filename:db3,.autoload:true})
app.get('/signup1',function(){
	res.sendFile(__dirname+'/public/my.html');
})
app.get('/signin1',function(){
	res.sendFile(__dirname+'/public/my1.html')
})
app.get('/varun1',function(req,res){
	var p=req.name.name1,
	var q=req.name.email,
	var r=req.name.uname,
	var s=req.name.passward
	var doc1={
		name:p,email:q,r:uname,s:passward
	}
	db.insert(doc1,function(error,newdoc){
		if(error){
			console.log('doc');
			res.send('not inserted to data base');
			else{
			res.sendFile(__dirname+'/public/my1.html')
				
			}
		}
	})
})
app.get('/varun',function{
	var doc2={
		email=req.params.email,
		passward=req.params.passward
	}
	db.find(doc2,function(err,dos){
		if(dos.length>0){
			res.render('king',{result:dos});
		}
		else{
			res.send('u r s passward or user name is wrong');
		}
	})
})
app.get('/varun1/:usernames',function(req,res){
	db.find({name:req.params.usernames})
	res.render('dashboard',{ab:doc1})})




app.listen(9999,function(){
	console.log('9999 server is running')
})




