

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

router.get('/plans.html',function(req,res){
  res.sendFile(path+'/plans.html');
});

router.get('/lecture.html',function(req,res){
  res.sendFile(path+'/lecture.html');
});

router.get('/lab.html',function(req,res){
  res.sendFile(path+'/lab.html');
});

router.get('/assignment.html',function(req,res){
  res.sendFile(path+'/assignment.html');
});

router.get('/mp.html',function(req,res){
  res.sendFile(path+'/mp.html');
});

router.get('/syllabusScheme.html',function(req,res){
  res.sendFile(path+'/syllabusScheme.html');
});


router.get('/ass.html',function(req,res){
  res.sendFile(path+'/ass.html');
});

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
 // console.log("polwa");
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




app.post('/virtualPage2',function(req,res){
  console.log(req.body);
  var query = "INSERT INTO syllabusScheme(subjectCode,courseName,IATest1,IATest2,IATestAvg,endSem,examDuration,TW,oral,total) VALUES(";
 query+= " '"+req.body.subjectCode+"',";
 query+= " '"+req.body.courseName+"',";
 query+= " '"+req.body.iatest1+"',";
 query+= " '"+req.body.iatest2+"',";
 query+= " '"+req.body.iatestavg+"',";
 query+= " '"+req.body.endsem+"',";
 query+= " '"+req.body.duration+"',";
 query+= " '"+req.body.tw+"',";
 query+= " '"+req.body.or+"',";
 query+= " '"+req.body.total+"')";

 connection.query(query, function(err,rows,fields){
    if(!!err){
	console.log('Error in the scheme insert query');
     }else{
	console.log('Successful scheme insert query');
      }
});

  res.redirect('/syllabusScheme.html');	//using POST REDIRECT GET

});





router.get('/schemeResult.html',function(req,res){
  //console.log("polwa");
var q = "SELECT * FROM syllabusScheme";
  connection.query(q, function(err,rows){
      if(!!err){
	  console.log('Error in the read query');
       }else{
	  console.log('Successful read query');
        }

    res.render('schemeData',{obj:rows});
  });
});






app.post('/virtualPage3',function(req,res){
  console.log(req.body);
  var query = "INSERT INTO lectureSchedule(portion,eg,plannedDate,actualDate,delivery) VALUES(";
 query+= " '"+req.body.portion+"',";
 query+= " '"+req.body.example+"',";
 query+= " '"+req.body.pdate+"',";
 query+= " '"+req.body.adate+"',";
 query+= " '"+req.body.delivery+"')";

 connection.query(query, function(err,rows,fields){
    if(!!err){
	console.log('Error in the lecture insert query');
     }else{
	console.log('Successful lecture insert query');
      }
});

  res.redirect('/lecture.html');	//using POST REDIRECT GET

});




router.get('/lectureResult.html',function(req,res){
var q = "SELECT * FROM lectureSchedule";
  connection.query(q, function(err,rows){
      if(!!err){
	  console.log('Error in the read query');
       }else{
	  console.log('Successful read query');
        }

    res.render('lecData',{obj:rows});
  });
});






app.post('/virtualPage4',function(req,res){
  console.log(req.body);
  var query = "INSERT INTO planLab(Expt,DateA,DateB,DateC,DateD,Concept,Aim) VALUES(";
 query+= " '"+req.body.expt+"',";
 query+= " '"+req.body.dateA+"',";
 query+= " '"+req.body.dateB+"',";
 query+= " '"+req.body.dateC+"',";
 query+= " '"+req.body.dateD+"',";
 query+= " '"+req.body.concept+"',";
 query+= " '"+req.body.aim+"')";

 connection.query(query, function(err,rows,fields){
    if(!!err){
	console.log('Error in the lab insert query');
     }else{
	console.log('Successful lab insert query');
      }
});

  res.redirect('/lab.html');	//using POST REDIRECT GET

});




router.get('/labResult.html',function(req,res){
var q = "SELECT * FROM planLab";
  connection.query(q, function(err,rows){
      if(!!err){
	  console.log('Error in the lab read query');
       }else{
	  console.log('Successful lab read query');
        }

    res.render('labData',{obj:rows});
  });
});





app.post('/virtualPage5',function(req,res){
  console.log(req.body);
  var query = "INSERT INTO assignment(question,subDate,givenDate) VALUES(";
 query+= " '"+req.body.question+"',";
 query+= " '"+req.body.givenDate+"',";
 query+= " '"+req.body.subDate+"')";

 connection.query(query, function(err,rows,fields){
    if(!!err){
	console.log('Error in the assignm insert query');
     }else{
	console.log('Successful assignm insert query');
      }
});

  res.redirect('/ass.html');	//using POST REDIRECT GET

});




router.get('/assResult.html',function(req,res){
var q = "SELECT * FROM assignment";
  connection.query(q, function(err,rows){
      if(!!err){
	  console.log('Error in the assignm read query');
       }else{
	  console.log('Successful assignm read query');
        }

    res.render('assData',{obj:rows});
  });
});







app.post('/virtualPage6',function(req,res){
  console.log(req.body);
  var query = "INSERT INTO miniProject(date,activity) VALUES(";
 query+= " '"+req.body.mpDate+"',";
 query+= " '"+req.body.activity+"')";

 connection.query(query, function(err,rows,fields){
    if(!!err){
	console.log('Error in the mp insert query');
     }else{
	console.log('Successful mp insert query');
      }
});

  res.redirect('/mp.html');	//using POST REDIRECT GET

});




router.get('/mpResult.html',function(req,res){
var q = "SELECT * FROM miniProject";
  connection.query(q, function(err,rows){
      if(!!err){
	  console.log('Error in the mp read query');
       }else{
	  console.log('Successful mp read query');
        }

    res.render('mpData',{obj:rows});
  });
});






app.listen(3000,function(){
  console.log('Server running at Port 3000');
});

















