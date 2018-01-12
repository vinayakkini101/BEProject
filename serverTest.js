

var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname;
app.use('/',router);
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password:'',
	database:'BEProject'
});

connection.connect(function(error){
	if(!!error){
		console.log('Error');
	}else{
		console.log('Connected');
	}
});




router.get('/',function(req,res){
  res.sendFile(path+'/index.html');
});

router.get('/login.html',function(req,res){
  res.sendFile(path+'/login.html');
});

router.get('/syllabus.html',function(req,res){
  res.sendFile(path+'/syllabus.html');
});


/*router.get('/syllabusScheme.html',function(req,res){
  res.sendFile(path+'/syllabusScheme.html');
});*/


app.post('/virtualPage',function(req,res){
  console.log(req.body);
  //res.sendFile(path+'/syllabusModules.html');
  //res.write('id is "'+req.body.modulename+'".\n');
  var query = "INSERT INTO syllabusModules(moduleID,moduleName,hours,content) VALUES(";
 query+= " '"+req.body.moduleID+"',";
 query+= " '"+req.body.modulename+"',";
 query+= " '"+req.body.hours+"',";
 query+= " '"+req.body.content+"')";

 connection.query(query, function(err,rows,fields){
    if(!!err){
	console.log('Error in the insert query');
     }else{
	console.log('Successful insert query');
      }
});

  res.redirect('/syllabusModules.html');	//using POST REDIRECT GET

});


router.get('/syllabusModules.html',function(req,res){
  res.sendFile(path+'/syllabusModules.html');
  var q = "SELECT * FROM syllabusModules";
  connection.query(q, function(err,rows,fields){
      if(!!err){
	  console.log('Error in the read query');
       }else{
	  console.log('Successful read query');
        }
  //console.log(rows[0].moduleName);
  });
});


router.get('/syllabResult.html',function(req,res){
  
  console.log("polwa");
var q = "SELECT * FROM syllabusModules";
  connection.query(q, function(err,rows){
      if(!!err){
	  console.log('Error in the read query');
       }else{
	  console.log('Successful read query');
        }

    res.render('syllabData',{obj:rows});
  });
});



app.listen(3000,function(){
  console.log('Server running at Port 3000');
});

















