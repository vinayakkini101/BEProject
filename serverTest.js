
var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname;
app.use('/',router);
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));




var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017';

var dbo;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("BEProject");
  console.log("Connected to BEProject");
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

router.get('/course',function(req,res){
  res.render('course');
});




// Syllabus Modules---------------------------------------------------

app.post('/virtualPage',function(req,res){
  console.log(req.body);
  var myobj={};
   myobj['courseID'] = req.body.courseID;
   myobj['moduleName'] = req.body.moduleName;
   myobj['hours'] = req.body.hours;
   myobj['content'] = req.body.content;
   dbo.collection("SyllabusModules").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 modules doc inserted");
   });
 
  res.redirect('/syllabusModules');  //using POST REDIRECT GET

});


router.get('/syllabusModules',function(req,res){
  dbo.collection('SyllabusModules').find().toArray(function(err , rows){
    if (err) return console.log(err)
    res.render('moduleData', {obj:rows});
          console.log("Module doc read");
    });
});






// Syllabus Examination Scheme-----------------------------------------------

app.post('/virtualPage2',function(req,res){
  console.log(req.body);

  var myobj={};
   myobj['courseID'] = req.body.courseID;
   myobj['courseName'] = req.body.courseName;
   myobj['iatest1'] = req.body.iatest1;
   myobj['iatest2'] = req.body.iatest2;
   myobj['iatestavg'] = req.body.iatestavg;
   myobj['endsem'] = req.body.endsem;
   myobj['duration'] = req.body.duration;
   myobj['tw'] = req.body.tw;
   myobj['or'] = req.body.or;
   myobj['total'] = req.body.total;
   dbo.collection('SyllabusScheme').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 scheme doc inserted");
   });
 
  res.redirect('/syllabusScheme');  //using POST REDIRECT GET

});



router.get('/syllabusScheme',function(req,res){
  dbo.collection('SyllabusScheme').find().toArray(function(err , rows){
  if (err) return console.log(err)
  res.render('schemeData', {obj:rows});
        console.log("Scheme doc read");
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
    dbo.collection('Assignments').find().toArray(function(err , rows){
	if (err) return console.log(err)
	res.render('assData', {obj:rows});
        console.log("Ass doc read");
    });
});




// Mini Project---------------------------------------------------------------

app.post('/virtualPage6',function(req,res){
  console.log(req.body);

   var myobj={};
   myobj['mpDate'] = req.body.mpDate;
   myobj['activity'] = req.body.activity;
   dbo.collection("MiniProject").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 MP doc inserted");
   });
 
  res.redirect('/mp');	//using POST REDIRECT GET

});


router.get('/mp',function(req,res){

    dbo.collection('MiniProject').find().toArray(function(err , rows){
	if (err) return console.log(err)
    // console.log(rows[0].mpDate);
	res.render('mpData', {obj:rows});
        console.log("MP doc read");
    });
});





// CO Attainment---------------------------------------------------------------

app.post('/virtualPage7',function(req,res){
  console.log(req.body);
/*
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
*/

  var myobj={};
   myobj['courseName'] = req.body.courseName;
   myobj['coID'] = req.body.coID;
   myobj['text'] = req.body.text;

  // var found = 0;
  // if(dbo.collection('CourseOutcome').find({coID:myobj['coID']}).count(function(err, count) {
        
  //         if(count > 0)
  //         {
  //             console.log("Found"+myobj['coID']);
              // dbo.collection('CourseOutcome').updateOne(
              //   { coID:myobj['coID'] },
              //   { 
              //     $set: { 
              //               courseName : req.body.courseName,
              //               coID : req.body.coID,
              //               text : req.body.text,
              //               "tool.toolName" : req.body.toolName,
              //               "tool.targetMark" : req.body.targetMark,
              //               "tool.targetStud" : req.body.targetStud,
              //               "tool.weightage" : req.body.weightage,
              //               "tool.minMark" : req.body.minMark,
              //               "tool.numStud" : req.body.numStud,
              //               "tool.totalStud" : req.body.totalStud,
              //               "tool.low" : req.body.low,
              //               "tool.mod" : req.body.mod,
              //               "tool.high" : req.body.high
              //           } 
              //   },
              //   { upsert : true}
              // );
          // }
          // else
          // {

               // var tool=[];
               var tempTool={};
               // tool1['toolName'] = req.body.tool;
               // tool1['targetMark'] = parseFloat(req.body.targetMark);
               // tool1['targetStud'] = parseFloat(req.body.targetStud);
               tempTool['weightage'] = parseFloat(req.body.weightage);
               // tool1['minMark'] = parseFloat(req.body.minMark);
               tempTool['numStud'] = parseFloat(req.body.numStud);
               tempTool['totalStud'] = parseFloat(req.body.totalStud);
               tempTool['low'] = parseFloat(req.body.low);
               tempTool['mod'] = parseFloat(req.body.mod);
               tempTool['high'] = parseFloat(req.body.high);
               tempTool['indirectAttain'] = parseFloat(req.body.indirectAttain);
               // tool.push(tool1);
               // myobj.tool = tool;


              //console.log(tool['targetMark']+tool['targetStud']);
               tempTool['attainPercent'] = tempTool['numStud'] / tempTool['totalStud'] * 100;
               if(tempTool['attainPercent'] >= tempTool['low'] && tempTool['attainPercent'] < tempTool['mod'])
                  tempTool['attainLevel'] = 1;
               else if(tempTool['attainPercent'] >= tempTool['mod'] && tempTool['attainPercent'] < tempTool['high'])
                  tempTool['attainLevel'] = 2;
               else 
                  tempTool['attainLevel'] = 3;

                dbo.collection('CourseOutcome').find({"coID" : req.body.coID}).toArray(function(err , rows){
                      if (err) return console.log(err)
                      // console.log(rows.length);
                      if(rows.length == 0)
                          tempTool['directAttain'] = 0;
                      else
                          tempTool['directAttain'] = parseFloat(rows[0].directAttain);
                      // console.log(tempTool['directAttain']);
                      tempTool['directAttain'] = tempTool['directAttain'] + ( tempTool['weightage'] * tempTool['attainLevel'] );  
                      // console.log(tempTool['directAttain']);
                      tempTool['overallAttain'] = (0.8 * tempTool['directAttain']) + (0.2 * tempTool['indirectAttain']);

                      dbo.collection('CourseOutcome').updateOne(
                      { coID:myobj['coID'] },
                      {
                          $set: {
                                    courseName : req.body.courseName,
                                    coID : req.body.coID,
                                    text : req.body.text,
                                    directAttain : tempTool['directAttain'],
                                    indirectAttain : tempTool['indirectAttain'],
                                    overallAttain : tempTool['overallAttain']
                                },

                          $push: { 
                                    "tool" : {
                                                toolName : req.body.tool,
                                                targetMark : parseFloat(req.body.targetMark),
                                                targetStud : parseFloat(req.body.targetStud),
                                                weightage : parseFloat(req.body.weightage),
                                                minMark : parseFloat(req.body.minMark),
                                                numStud : parseFloat(req.body.numStud),
                                                totalStud : parseFloat(req.body.totalStud),
                                                low : parseFloat(req.body.low),
                                                mod : parseFloat(req.body.mod),
                                                high : parseFloat(req.body.high),
                                                attainPercent : tempTool['attainPercent'],
                                                attainLevel : tempTool['attainLevel']
                                             }
                                }
                      },
                      { upsert : true }
                      );

                });



              // dbo.collection('CourseOutcome').updateOne(
              //   { coID:myobj['coID'] },
              //   {
              //       $set: {
              //                 courseName : req.body.courseName,
              //                 coID : req.body.coID,
              //                 text : req.body.text,
              //                 directAttain : tempTool['directAttain']
              //             },

              //       $push: { 
              //                 "tool" : {
              //                             toolName : req.body.tool,
              //                             targetMark : parseFloat(req.body.targetMark),
              //                             targetStud : parseFloat(req.body.targetStud),
              //                             weightage : parseFloat(req.body.weightage),
              //                             minMark : parseFloat(req.body.minMark),
              //                             numStud : parseFloat(req.body.numStud),
              //                             totalStud : parseFloat(req.body.totalStud),
              //                             low : parseFloat(req.body.low),
              //                             mod : parseFloat(req.body.mod),
              //                             high : parseFloat(req.body.high),
              //                             attainPercent : tempTool['attainPercent'],
              //                             attainLevel : tempTool['attainLevel']
              //                          }
              //             }
              //   },
              //   { upsert : true }

              //   );

               


                // dbo.collection("CourseOutcome").insertOne(myobj, function(err, res) {
                //   if (err) throw err;
                //   console.log("1 CO doc inserted");
                // });
          // }
           

           res.redirect('/coattain');  //using POST REDIRECT GET

    // }));
});


  // console.log("fnd is "+found);
  



router.get('/coattain',function(req,res){
  //For the dropdown
   dbo.collection('Course').find().toArray(function(err , rows){
  if (err) return console.log(err)
       res.render('coattain', {obj:rows});
        console.log("CO doc read");
    });

  //  dbo.collection('Course').find().toArray(function(err , rows){
  // if (err) return console.log(err)
  //   });


});





// Course --------------------------------------------------------------

app.post('/virtualPage8',function(req,res){
  console.log(req.body);

  var myobj={};
   myobj['courseID'] = req.body.courseID;
   myobj['courseName'] = req.body.courseName;
   dbo.collection('Course').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 course doc inserted");
   });
 
  res.redirect('/coattain');  //using POST REDIRECT GET
});


router.get('/coattain',function(req,res){
   dbo.collection('Course').find().toArray(function(err , rows){
  if (err) return console.log(err)
  res.render('coattain', {obj:rows});
        console.log("coattain doc read");
    });
});

