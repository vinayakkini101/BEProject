
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




app.listen(7000,function(){
  console.log('Server running at Port 7000');
});


router.get('/',function(req,res){
  res.render('index');
});

router.get('/syllabus',function(req,res){
  res.render('syllabus');
});

router.get('/plans',function(req,res){
  res.render('plans');
});

// router.get('/coattain',function(req,res){
//   res.render('coattain');
// });




// Syllabus Modules---------------------------------------------------

app.post('/virtualPage',function(req,res){
  console.log(req.body);
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
  res.redirect('/syllabusModules');	//using POST REDIRECT GET

});


router.get('/syllabusModules',function(req,res){
  var q = "SELECT * FROM syllabusModules";
  connection.query(q, function(err,rows){
      if(!!err){
	  console.log('Error in the read query');
       }else{
	  console.log('Successful read query');
        }
      res.render('moduleData',{obj:rows});
  });
});






// Syllabus Examination Scheme-----------------------------------------------

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

  res.redirect('/syllabusScheme');	//using POST REDIRECT GET

});



router.get('/syllabusScheme',function(req,res){
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





// Lecture Schedule--------------------------------------------------------

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

  res.redirect('/lecture');	//using POST REDIRECT GET

});




router.get('/lecture',function(req,res){
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



// Lab ---------------------------------------------------------------

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

  res.redirect('/lab');	//using POST REDIRECT GET

});



router.get('/lab',function(req,res){
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




// Assignments---------------------------------------------------------------

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

  res.redirect('/ass');	//using POST REDIRECT GET

});


router.get('/ass',function(req,res){
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




// Mini Project---------------------------------------------------------------

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

  res.redirect('/mp');	//using POST REDIRECT GET

});



router.get('/mp',function(req,res){
  //res.sendFile(path+'/mp.html');
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



// CO Attainment---------------------------------------------------------------

app.post('/virtualPage7',function(req,res){
  console.log(req.body);

var attainper = (req.body.numstu / 77) * 100 ;
console.log(req.body.method);
var attainlevel;
if(req.body.method == "test1")
 if(attainper>=50 && attainper<=60)
	attainlevel = 1;
 else if(attainper>60 && attainper<=70)
	attainlevel = 2;
 else if(attainper>70)
	attainlevel = 3;

if(req.body.method == "lab19" || req.body.method == "oral")
 if(attainper>=70 && attainper<=80)
	attainlevel = 1;
 else if(attainper>80 && attainper<=90)
	attainlevel = 2;
 else
	attainlevel = 3;

if(req.body.method == "theory")
 if(attainper>=60 && attainper<=70)
	attainlevel = 1;
 else if(attainper>70 && attainper<=85)
	attainlevel = 2;
 else
	attainlevel = 3;



  var query = "INSERT INTO coattain(method,weightage,totalmarks,minmarks,numstu,attainper,attainlevel) VALUES(";
 query+= " '"+req.body.method+"',";
 query+= " '"+req.body.weightage+"',";
 query+= " '"+req.body.totalmarks+"',";
 query+= " '"+req.body.minmarks+"',";
 query+= " '"+req.body.numstu+"',";
 query+= " '"+attainper+"',";
 query+= " '"+attainlevel+"')";
  //var a = req.body.weightage * req.body.totalmarks;





 connection.query(query, function(err,rows,fields){
    if(!!err){
  console.log('Error in the coattain insert query');
     }else{
  console.log('Successful coattain insert query');
      }
});




  res.redirect('/coattain');  //using POST REDIRECT GET

});



router.get('/coattain',function(req,res){
  //res.sendFile(path+'/mp.html');
  var q = "SELECT * FROM coattain";
  connection.query(q, function(err,rows){
      if(!!err){
    console.log('Error in the coattain read query');
       }else{
    console.log('Successful coattain read query');
        }



        console.log('before the  quewsry');
  var directattain = 0;
  var q = "SELECT method,attainlevel FROM coattain";


connection.query(q, function(err,rowstwo){
      if(!!err){
    console.log('Error in the coattain read query');
       }else{
    console.log('Successful coattain read query');
        }
    
  console.log('after the  quewsry');
        rows.forEach(function(rowtwo,index)
        {
        	directattain = directattain + rowtwo.weightage * rowtwo.attainlevel;
        });

        console.log('after the  foreach');
       console.log(directattain);

    res.render('coattain',{obj:rows});
  });
});




});
