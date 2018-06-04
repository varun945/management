
var express=require('express')
var app=express();
var ejs=require('ejs')
var mongojs=require('mongojs')
var db = mongojs('mongodb://varun1:a12345@ds245680.mlab.com:45680/joshvarun',['admin'])

app.use(express.static('public'));
app.set('view engine','ejs')
//var datastore=require('nedb')
var body=require('body-parser')
app.use(body.urlencoded({extended:false}))
var session=require('express-session')
app.use(session({secret:'keyy'}) )
app.set('port',process.env.PORT||5000)

//var db = new datastore({filename:'db2',autoload:true})
app.get('/signup',function(req,res){
if(req.session.varun==true){
	res.redirect('/loggedin');
}
else{
	res.sendFile(__dirname+'/public/collsignup.html');
}

	
})
app.get('/login',function(req,res) {
if(req.session.varun==true){
	res.redirect('/loggedin');
}
else{
	res.sendFile(__dirname+'/public/collsignin.html');
}
})

app.get('/loggedin',function(req,res){
	db.admin.find({},function(error,newdoc){
   	  		res.render('coll',{result:newdoc,user:req.session.username});
   	  		
         })
})
app.post('/pa',function(req,res){

	
	//var p=req.query.name;
	//var q=req.query.email;
	//var r=req.query.phnumber;
	//var s=req.query.passward;
	//res.send(''+p+''+q+''+r+''+s+'');
	var doc = {
		name:req.body.name1,
		email:req.body.email,
		phnumber:req.body.username1,
		passward:req.body.passward,
	}
	db.admin.insert(doc,function(err,newdoc){
		if(err){
			res.send('err occured');
		}
		else{
			//res.send(newdoc)
			res.sendFile(__dirname+'/public/collsignin.html');
		}
	})
})
app.post('/q',function(req,res){
   //req.session.key='false';
var doc2={
   	email:req.body.email,
   	passward:req.body.passward
     
   	
      }
      
      db.admin.find(doc2,function(err,docs){
   	  console.log(docs)
   	   
   	  if(docs.length>0)
   	  {
   	  	req.session.varun=true;
   	  	req.session.username=docs;
   	  	
   	  	db.admin.find({},function(error,newdoc){
   	  		res.render('coll',{result:newdoc,user:docs});
   	  		
         })
   	  
	   	  }
        else{
         	res.send('your email or password are wrong');
         }
     })})




         
   	  		

   	 	

app.get('/profile/:username',function(req,res){

	//var username=req.params.username;
	
	db.admin.find({name:req.params.username},function(error,doc){
		//if(doc1.length>0){
			//if(req.session.key=='true'){

			res.render('dashboard',{re:doc})
			//}
			//else{
			//	res.redirect('/login');
			//}
			
		//}
	})

})
app.get('/logout',function(req,res){
req.session.destroy(function(){
console.log('logout')
})
res.redirect('/login')
})

    

app.listen(app.get('port',function(){
	console.log(' server is running plse wait....:9112')
})