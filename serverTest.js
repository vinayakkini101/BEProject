
var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname;
app.use('/',router);
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
const multer = require('multer');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var session      = require('express-session');

// Required files
var mongo = require('./modules/db.js');
var page1 = require('./modules/syllabusModulesVP.js');
var page2 = require('./modules/COAttain.js');
var page3 = require('./modules/COAttainToolVP.js');
var page4 = require('./modules/CourseOutcome.js');
var page5 = require('./modules/Course.js');
var page6 = require('./modules/COReport.js');

// Start listening 
var port_number = app.listen(process.env.PORT || 7000);
app.listen(port_number,function(){
  console.log('Server running at Port 7000');
});


mongoose.connect('mongodb://vinayakkini101:beproject@ds225608.mlab.com:25608/beproject'); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// Disable browser cache
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});



app.get('/', function(req, res) {
   res.render('login.ejs', { message: req.flash('loginMessage') });
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


router.get('/report',function(req,res){
  res.render('report');
});

/*router.get('/reportprintco',function(req,res){
   res.render('reportprintco');
});*/

//app.use('/COReport',page6.COReport);

var coreport = require('./modules/COReport.js');
coreport.COReport(app);


router.get('/charts',function(req,res){
  res.render('charts');
});


// app.get('/admin', isLoggedIn, function(req, res) {
//   if(req.user.name=='Admin')
//   {
//       mongo.connect(function( err ) {
//         if(err) throw err;
//         mongo.dbo.collection('departments').find().toArray(function(err , rows){
//           if (err) return console.log(err)
//           res.render('admin.ejs', {obj4:rows, user : req.user});
//           });
//       });
//   }
//   else
//   {
//     res.render('login.ejs', {
//       user : req.user
//      });
//   }
// });



 app.get('/dashboard', isLoggedIn, function(req, res) {
        if(req.user.name=='Admin')
        {
            mongo.connect(function( err ) {
                if(err) throw err;
                mongo.dbo.collection('departments').find().toArray(function(err , rows){
                  if (err) return console.log(err)
                      mongo.dbo.collection('users').find().toArray(function(err , depRows){
                          if (err) return console.log(err)
                          mongo.dbo.collection('Course').find().toArray(function(err , courseRows){
                              if (err) return console.log(err)
                              res.render('admin.ejs', {obj3:courseRows, obj5:depRows , obj4:rows , user : req.user});
                          });
                      });
                });
            });
        }
        else
        {
          res.render('index.ejs', {
            user : req.user
          });
        }
});


    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });





	// show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));







//  temp code

/*app.get('/display', function(req,res){
    mongo.connect( function( err ) {  
        mongo.dbo.collection('CourseOutcome').find().toArray(function(err , rows){
          if (err) return console.log(err)
          res.render('display', {displayObject : rows});
          });
    });
});
*/
    app.get('/display', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}



// Admin Assign code
var assign= require('./modules/assign.js');
assign.assign(app);


// Admin Add Teacher code
var adminTeacher= require('./modules/addTeacher.js');
adminTeacher.addTeacher(app);


// Admin Add Course code
var adminCourse= require('./modules/addCourse.js');
adminCourse.addCourse(app);



// Download code
router.get('/template.xls', function(req,res){
    res.download('./template.xls');
});



// Chart code
var chartcode= require('./modules/chartCode.js');
chartcode.chartCode(app);




//create folder uploads if it does not exist......if it exists, it does nothing
    var mkdirp = require('mkdirp');  console.log(__dirname);
    mkdirp.sync(__dirname+'/uploads', function (err) {
        if (err) console.error(err)
        else console.log('Uploads folder created!')
    });
    
    mkdirp.sync(__dirname+'/reports', function (err) {
        if (err) console.error(err)
        else console.log('Reports folder created!')
    });


// Syllabus Modules---------------------------------------------------  
var syllab = require('./modules/syllabusModulesVP.js');
syllab.syllabusModulesVP(app);

router.get('/syllabusModules',function(req,res){
  mongo.connect(function( err ) {
      if(err) throw err;
      mongo.dbo.collection('SyllabusModules').find().toArray(function(err , rows){
        if (err) return console.log(err)
        res.render('moduleData', {obj:rows});
              console.log("Module doc read");
        });
    });
});



// Syllabus Examination Scheme-----------------------------------------------

var examScheme = require('./modules/examScheme.js');
examScheme.examScheme(app);



// Course --------------------------------------------------------------

var cours = require('./modules/Course.js');
cours.Course(app);


// coattain------------------------------------
var coattain = require('./modules/COAttain.js');
coattain.COAttain(app) 



// Course Outcome--------------------------------------------------------------
var cout = require('./modules/CourseOutcome.js');
cout.CourseOutcome(app);






// Lecture Schedule--------------------------------------------------------

app.post('/virtualPage3',function(req,res){
console.log(req.body);
  var yourobj={};
   yourobj['num'] = req.body.num;
   yourobj['portion'] = req.body.portion;
   yourobj['planned'] = req.body.planned;
   yourobj['actual'] = req.body.actual;
   yourobj['method'] = req.body.method;
   

   console.log('num',yourobj['num']);
   console.log('portion',yourobj['portion']);
   console.log('planned',yourobj['planned']);
   console.log('actual',yourobj['actual']);
   console.log('method',yourobj['method']);

   
   dbo.collection("Lecture").insertOne(yourobj, function(err, res) {
      if (err) throw err;
      console.log("1 Lecture doc inserted");

  });

  res.redirect('/lecture'); //using POST REDIRECT GET

});


router.get('/lecture',function(req,res){
    dbo.collection('Lecture').find().toArray(function(err , rows){
  if (err) return console.log(err)
  res.render('lecture', {obj:rows});
        console.log("Lecture doc read");
    });
 });



// Lab ---------------------------------------------------------------

app.post('/virtualPage4',function(req,res){
  console.log(req.body);
  var yourobj={};
   yourobj['expnum'] = req.body.expnum;
   yourobj['dateA'] = req.body.dateA;
   yourobj['dateB'] = req.body.dateB;
   yourobj['dateC'] = req.body.dateC;
   yourobj['dateD'] = req.body.dateD;
   yourobj['concept'] = req.body.concept;
   yourobj['titleaim'] = req.body.titleaim;
   

   console.log('expnum',yourobj['expnum']);
   console.log('dateA',yourobj['dateA']);
   console.log('dateB',yourobj['dateB']);
   console.log('dateC',yourobj['dateC']);
   console.log('dateD',yourobj['dateD']);
   console.log('concept',yourobj['concept']);
   console.log('titleaim',yourobj['titleaim']);

   
   dbo.collection("Lab").insertOne(yourobj, function(err, res) {
      if (err) throw err;
      console.log("1 Lab doc inserted");

  });

  res.redirect('/lab'); //using POST REDIRECT GET

});


router.get('/lab',function(req,res){
    dbo.collection('Lab').find().toArray(function(err , rows){
  if (err) return console.log(err)
  res.render('lab', {obj:rows});
        console.log("Lab doc read");
    });
 });




// Assignments---------------------------------------------------------------

app.post('/virtualPage5',function(req,res){
  console.log(req.body);

      var myobj={};
   myobj['question'] = req.body.question;
   myobj['givenDate'] = req.body.givenDate;
   myobj['subDate'] = req.body.subDate;
   dbo.collection("Assignments").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 MP doc inserted");

  });

  res.redirect('/ass'); //using POST REDIRECT GET

});


router.get('/ass',function(req,res){






var mongo = require('mongodb').MongoClient;
    var assert = require('assert');
    var resultArray = [];

   // mongo.connect(url, function(err, db) {
    //assert.equal(null, err);
    var cursor = dbo.collection('Assignments').find();

         var PDFDocument = require('pdfkit');
          var fs = require('fs');

      var pdfdoc = new PDFDocument;    
      console.log(" new pdf doc variable");

      //var pdfFile = path.join('reports/', 'out.pdf');
      //var pdfStream = fs.createWriteStream('reports/out.pdf');


      pdfdoc.pipe(fs.createWriteStream('reports/assignment.pdf'));    
      //console.log(" report generation");
      //doc.font('fonts/PalatinoBold.ttf').fontSize(25).text(100, 100);


      cursor.forEach(function(doc, err) {
      console.log(" isnde foreach");
        
      assert.equal(null, err);
      resultArray.push(doc);

        console.log("this s tj e doocccc",doc);
         
        // doc.font('Times-Roman')
        //     .fontSize(48)
        //     .text(resultArray,100,100);

        //doc.text(resultArray,100,100);
        console.log("this is result Array = ",resultArray);
        console.log(" report text added");

//doc.end();


    }, function() {
      //dbo.close();
      //res.render('/mp');
console.log(" inside the second function  = ",resultArray);



pdfdoc.text('FR. Conceicao Rodrigues College Of Engineering', 145,20);
pdfdoc.moveDown();
pdfdoc.text('Father Agnel Ashram, Bandstand, Bandra-west, Mumbai-50', 125,32);
pdfdoc.moveDown();
pdfdoc.text('Department of Computer Engineering', 155,44);



for(var i = 0, len = resultArray.length; i < len; i++){
pdfdoc.text(i+1,90,100+(i*75));
pdfdoc.text(resultArray[i].question,100,100+(i*75));
pdfdoc.text('Date of Assignment given:',100,135+(i*75));
pdfdoc.text(resultArray[i].givenDate,300,135+(i*75));
pdfdoc.text('Date of Assignment submission:',100,150+(i*75));
pdfdoc.text(resultArray[i].subDate,300,150+(i*75));
pdfdoc.moveDown();
}
      

dbo.collection('Assignments').find().toArray(function(err , rows){
  if (err) return console.log(err)
  res.render('assData', {obj:rows});
        console.log("Ass doc read");
    });





//pdfdoc.pipe(fs.createWriteStream('reports/output.pdf'));   
console.log('fs createWriteStream');
//pdfdoc.text("any crap", 100,100); 


// pdfStream.addListener('finish', function() {
//     // HERE PDF FILE IS DONE

//       console.log(" pdfStream ");
//     res.download('reports/out.pdf');
//  });
//pdfdoc.text(resultArray['0'],100,100);
pdfdoc.end();

    });


    
});



// Lab---------------------------------------------------------------

app.post('/virtualPage11',function(req,res){
  console.log(req.body);
  /*var query = "INSERT INTO assignment(question,subDate,givenDate) VALUES(";
 query+= " '"+req.body.question+"',";
 query+= " '"+req.body.givenDate+"',";
 query+= " '"+req.body.subDate+"')";

 connection.query(query, function(err,rows,fields){
    if(!!err){
  console.log('Error in the assignm insert query');
     }else{
  console.log('Successful assignm insert query');
      }*/

     
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
 
  res.redirect('/mp');  //using POST REDIRECT GET
console.log(" report 1");

///// report generation

//   var PDFDocument = require('pdfkit');
//   var fs = require('fs');

// doc = new PDFDocument;    
// console.log(" report 2");

// doc.pipe(fs.createWriteStream('reports/output.pdf'));    
// console.log(" report generation");
// //doc.font('fonts/PalatinoBold.ttf').fontSize(25).text(100, 100);

// doc.font('Times-Roman')
//     .fontSize(48)
//     .text(myobj['mpDate'],100,100);

// console.log(" report text added");

// doc.end();

///// end report generation
});

router.get('/mp',function(req,res){

    
    var mongo = require('mongodb').MongoClient;
    var assert = require('assert');
    var resultArray = [];

   // mongo.connect(url, function(err, db) {
    //assert.equal(null, err);
    var cursor = dbo.collection('MiniProject').find();

         var PDFDocument = require('pdfkit');
          var fs = require('fs');

      var pdfdoc = new PDFDocument;    
      console.log(" new pdf doc variable");

      //var pdfFile = path.join('reports/', 'out.pdf');
      //var pdfStream = fs.createWriteStream('reports/out.pdf');


      pdfdoc.pipe(fs.createWriteStream('reports/output.pdf'));    
      //console.log(" report generation");
      //doc.font('fonts/PalatinoBold.ttf').fontSize(25).text(100, 100);


      cursor.forEach(function(doc, err) {
      console.log(" isnde foreach");
        
      assert.equal(null, err);
      resultArray.push(doc);

        console.log("this s tj e doocccc",doc);
         
        // doc.font('Times-Roman')
        //     .fontSize(48)
        //     .text(resultArray,100,100);

        //doc.text(resultArray,100,100);
        console.log("this is result Array = ",resultArray);
        console.log(" report text added");

//doc.end();


    }, function() {
      //dbo.close();
      //res.render('/mp');
console.log(" inside the second function  = ",resultArray);



pdfdoc.text('FR. Conceicao Rodrigues College Of Engineering', 145,20);
pdfdoc.moveDown();
pdfdoc.text('Father Agnel Ashram, Bandstand, Bandra-west, Mumbai-50', 125,32);
pdfdoc.moveDown();
pdfdoc.text('Department of Computer Engineering', 155,44);


pdfdoc.text('Date',100,85);
pdfdoc.text('Activity',225,85);


for(var i = 0, len = resultArray.length; i < len; i++){
pdfdoc.text(resultArray[i].mpDate,100,100+(i*50));
pdfdoc.text(resultArray[i].activity,225,100+(i*50));

pdfdoc.moveDown();
}
      dbo.collection('MiniProject').find().toArray(function(err , rows){
  if (err) return console.log(err)
    // console.log(rows[0].mpDate);
  res.render('mpData', {obj:rows});
        console.log("MP doc read");
    });





//pdfdoc.pipe(fs.createWriteStream('reports/output.pdf'));   
console.log('fs createWriteStream');
//pdfdoc.text("any crap", 100,100); 


// pdfStream.addListener('finish', function() {
//     // HERE PDF FILE IS DONE

//       console.log(" pdfStream ");
//     res.download('reports/out.pdf');
//  });
//pdfdoc.text(resultArray['0'],100,100);
pdfdoc.end();

    });

      

      

//console.log(" result outside the  = ",resultArray);
//console.log("test to see flow final");
// pdfdoc.pipe(fs.createWriteStream('reports/output.pdf'));   
// console.log('fs createWriteStream'); 
// pdfdoc.text(resultArray,100,100);
 // });


});





// CO Attainment Adding tools---------------------------------------------------------------

var coat = require('./modules/COAttainToolVP.js');
coat.COAttainToolVP(app);

  



// PO table---------------------------------------------------------------
app.post('/virtualPage10',function(req,res){
  console.log(req.body);

console.log("1 po doc");
  var myobj={};
   myobj['poID'] = req.body.poID;
   myobj['textpo'] = req.body.textpo;
   myobj['year'] = parseFloat(req.body.year);
   myobj['courseName'] = req.body.courseName;

   /*dbo.collection('POAttainment').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 po doc inserted");
   });*/

   mongo.connect(function (err){
	   mongo.dbo.collection('POAttainment').find({"poID" : req.body.poID}).toArray(function(err , rows){
	                  mongo.dbo.collection('POAttainment').updateOne(
	                      { poID:myobj['poID'] },
	                      {
	                          $set: { 
	                                    poID : myobj['poID'],
	                                    textpo : myobj['textpo']

	                                },
	                          $push:{

	                          			"valuestry": {
	                                    		year : myobj['year'],
	                                    		courseName : myobj['courseName']

	                                    		}  
	                                }
	                      },
	                      { upsert : true }
	                      );

	      });
   });

 
  res.redirect('/poattainment');  //using POST REDIRECT GET
});





// End of PO table---------------------------------------------------------------

// PO Attainment---------------------------------------------------------------
var overallAttainPO;
app.post('/virtualPage8',function(req,res){
  console.log(req.body);

  var myobj={};
  myobj['courseID'] = req.body.courseID;
   myobj['po1'] = req.body.po1;
   myobj['po2'] = req.body.po2;
    myobj['po3'] = req.body.po3;
   myobj['po4'] = req.body.po4;
    myobj['po5'] = req.body.po5;
   myobj['po6'] = req.body.po6;
    myobj['po7'] = req.body.po7;
   myobj['po8'] = req.body.po8;
    myobj['po9'] = req.body.po9;
   myobj['po10'] = req.body.po10;
    myobj['po11'] = req.body.po11;
   myobj['po12'] = req.body.po12;
   myobj['year'] = parseFloat(req.body.year);
myobj['courseName'] = req.body.courseName;
myobj['yearpg2'] = parseFloat(req.body.yearpg2);
myobj['courseNamepg2'] = req.body.courseNamepg2;


    console.log(myobj['po12']);
//// coonditions for 0
if (myobj['po1'] == '' )
{
  myobj['po1'] = 0;
}
if (myobj['po2'] == '' )
{
  myobj['po2'] = 0;
}
if (myobj['po3'] == '' )
{
  myobj['po3'] = 0;
}
if (myobj['po4'] == '' )
{
  myobj['po4'] = 0;
}
if (myobj['po5'] == '' )
{
  myobj['po5'] = 0;
}
if (myobj['po6'] == '' )
{
  myobj['po6'] = 0;
}
if (myobj['po7'] == '' )
{
  myobj['po7'] = 0;
}
if (myobj['po8'] == '' )
{
  myobj['po8'] = 0;
}
if (myobj['po9'] == '' )
{
  myobj['po9'] = 0;
}
if (myobj['po10'] == '' )
{
  myobj['po10'] = 0;
}
if (myobj['po11'] == '' )
{
  myobj['po11'] = 0;
}
if (myobj['po12'] == '' )
{
  myobj['po12'] = 0;
}

console.log("last",myobj['po12']);

/// insertion in the PO Table --- we hav to remove this block


///// End of INsertions

//// end of conditions
   //myobj['test'] = parseFloat(myobj['po12']) + parseFloat(myobj['po1']);


 //myobj['total'] = parseFloat(myobj['po1']) + parseFloat(myobj['po2']) + parseFloat(myobj['po3']) + parseFloat(myobj['po4']) + parseFloat(myobj['po5']) + parseFloat(myobj['po6']) + parseFloat(myobj['po7']) + parseFloat(myobj['po8']) + parseFloat(myobj['po9']) + parseFloat(myobj['po10']) + parseFloat(myobj['po11']) + parseFloat(myobj['po12']);



	mongo.connect( function( err ) {
			/// putting in co table
			                  mongo.dbo.collection('CourseOutcome').updateOne(
			                      { "courseID" : req.body.courseID,
			                      	"valuestry.year" : parseFloat(req.body.yearpg2) 
			                      },
			                      {
			                          $push: { 
			                                    "valuestry.$.pos" : {
							                                                po1 : myobj['po1'],
							                                                po2 : myobj['po2'],
							                                                po3 : myobj['po3'],
							                                                po4 : myobj['po4'],
							                                                po5 : myobj['po5'],
							                                                po6 : myobj['po6'],
							                                                po7 : myobj['po7'],
							                                                po8 : myobj['po8'],
							                                                po9 : myobj['po9'],
							                                                po10 : myobj['po10'],
							                                                po11: myobj['po11'],
							                                                po12 : myobj['po12']



			                                             }
			                                }
			                      },
			                      { upsert : true }
			                      );//updateOne
			/// putting in co table done


        ////po attainment table mein entry starts
				mongo.dbo.collection('CourseOutcome').find( {courseID:myobj['courseID']},{"valuestry.$.overallAttain" : 1, _id : 0,courseName : 0,courseID :0 }).toArray(function(err , rows){
							//getting overall attain year wise from co outcome table
							for(var i=0,len= rows['0'].valuestry.length;i<len;i++){
										
								if(rows['0'].valuestry[i].year==parseFloat(req.body.yearpg2))
										{
											overallAttainPO = rows['0'].valuestry[i].overallAttain;
										}
							}

							//console.log("check overall",rows['0'].valuestry['0'].overallAttain);
							//console.log(rows);
							console.log('overall shhitt',overallAttainPO);

							if(myobj['po1'] > 0 && myobj['po1'] <= 3){
									///po attainment table mein entry of overall attain

									mongo.dbo.collection('POAttainment').find({poID : '1'}).toArray(function(err , rows1){
											mongo.dbo.collection('POAttainment').updateOne(
											                      { "valuestry.year" : myobj['yearpg2'],
											                      	"valuestry.courseName" : myobj['courseNamepg2']
											                      },
											                      {              $push: { 
											                                    "valuestry.$.try1" : {
											                                    			year : myobj['yearpg2'],
											                                                courseID : req.body.courseID,
											                                                courseName : myobj['courseNamepg2'],
											                                                "insidetry2":{
											                                                    value : myobj['po1'],
											                                                    overallAttain : overallAttainPO
											                                                  }
											                                             }
											                                }
											                      },
											                      { upsert : true }
											                      );//updateOne
									});//mongo.dbo.collection('POAttainment').find({poID : '1'})

									///po attainment table mein entry of overall attain done
}//if --check
}); //mongo.dbo.collection('CourseOutcome').find( {courseID:myobj['courseID']},{"valuestry.$.overallAttain" --check

}); //mongo.connect --check


				/*mongo.connect( function( err ) { // --check
									mongo.dbo.collection('POAttainment').find({poID : '1'},{"valuestry.try1.insidetry2.value" : 1}).toArray(function(err , rows){

											var total = 0,count=0;
											//console.log(rows['0'].valuestry.length);


											for(var i=0,len=rows['0'].valuestry.length;i<len;i++){
													if(rows['0'].valuestry[i].year == parseFloat(req.body.yearpg2))
													{
															console.log(i);

															console.log("array thigy",rows['0'].valuestry[i].try1);
															console.log("length value",rows['0'].valuestry[i].try1.length);



													}//if


											}//for





									});//mongo.dbo.collection('POAttainment').find({poID : '1'},{"valuestry.try1.insidetry2.value" : 1}


							///}//if myobj['po1'] > 0 && myobj['po1'] <= 3 --check r


				///});//mongo.dbo.collection('CourseOutcome').find({ courseID:myobj['courseID']},{"valuestry.$.overallAttain" -- check r       

	///});//mongo.connect --check r

});// --check mongo.connect 2nd wala*/
res.redirect('/poattainment');

});//app.post




app.post('/virtualPage14',function(req,res){
var myobj={};
myobj['yearpg3'] = parseFloat(req.body.yearpg3);
myobj['courseNamepg3'] = req.body.courseNamepg3;

mongo.connect( function( err ) { // --check
									mongo.dbo.collection('POAttainment').find({poID : '1'},{"valuestry.try1.insidetry2.value" : 1}).toArray(function(err , rows){

											var total = 0,count=0;
											console.log(rows['0']);


											for(var i=0,len=rows['0'].valuestry.length;i<len;i++){
													if(rows['0'].valuestry[i].year == parseFloat(req.body.yearpg3) && rows['0'].valuestry[i].courseName == req.body.courseNamepg3)
													{
															console.log(i);

															console.log("array thigy",rows['0'].valuestry[i].try1);
															console.log("length value",rows['0'].valuestry[i].try1.length);

															for(var j = 0, len1 = rows['0'].valuestry[i].try1.length;j<len1;j++){

																	total = total + parseFloat(rows['0'].valuestry[i].try1[j].insidetry2.value);
																	console.log('this is total',total);
												   
												   					count++;
												   					console.log('this is counttt',count);



															}//for j

															console.log('this is total outside',total);
															console.log('this is counttt',count);

															var copomatrix = total / count;
															console.log("copomatrix",copomatrix);



															 var sum1=0,count1=0,sum2=0,count2=0,sum3=0,count3=0;
															  var flag1=0,flag2=0,flag3=0;

															  console.log("val i",i);
															  console.log("check undefined",rows['0'].valuestry[i].try1.length);
															for(var j = 0, len = rows['0'].valuestry[i].try1.length; j < len; j++){
										  							if(rows['0'].valuestry[i].try1[j].insidetry2.value == '1')
																			  {
																			    console.log('inside valueee onneee');
																			    sum1 = sum1 + rows['0'].valuestry[i].try1[j].insidetry2.overallAttain;
																			    count1++;
																			    console.log('checckkkkk1',rows['0'].valuestry[i].try1[j].insidetry2.overallAttain);
																			    flag1=1;
																			  }




										   							if(rows['0'].valuestry[i].try1[j].insidetry2.value == '2')
																			  {
																			    console.log('inside valueee twoo');
																			    sum2 = sum2 + rows['0'].valuestry[i].try1[j].insidetry2.overallAttain;
																			    count2++;

																			    console.log('checckkkkk2',rows['0'].valuestry[i].try1[j].insidetry2.overallAttain);
																			    flag2=2;
																			  }


										   							if(rows['0'].valuestry[i].try1[j].insidetry2.value == '3')
																			  {
																			    console.log('inside valueee threeeeeeee');
																			    sum3 = sum3 + rows['0'].valuestry[i].try1[j].insidetry2.overallAttain;
																			    count3++;
																			    console.log('checckkkkk3',rows['0'].valuestry[i].try1[j].insidetry2.overallAttain);
																			    flag3=3;
																			  }


															} //for j vala
															var average1=0,valavg1=0,average2=0,valavg2=0,average3=0,valavg3=0;
															if(flag1==1){
																	  console.log('inside flag onne');
																	average1 = sum1/count1;
																	valavg1 = 1 * average1;
																	console.log('value 1',valavg1);
															}
															if(flag2==2){
																	  console.log('inside flag twoo');
																	 average2 = sum2/count2;
																	 valavg2 = 2 * average2;
																	console.log('value 2',valavg2);

															}
															if(flag3==3){
																	  console.log('inside flag three');
																	average3 = sum3/count3;
																	valavg3 = 3 * average3;
																	console.log('value 3',valavg3);
															}
															var totalvalavg = valavg1+valavg2+valavg3;
															console.log('totaalvalavgg',totalvalavg);
															var poattain = totalvalavg/(flag1+flag2+flag3);
															console.log('final yyaayy',poattain);
															break;

													}//if


											}//for

											console.log('totaalvalavgg outside',totalvalavg);
											console.log('final yyaayy outside',poattain);
											mongo.dbo.collection('POAttainment').updateOne(
										                      { 
										                      	"valuestry.year" : myobj['yearpg3'],
										                      	"valuestry.courseName" : myobj['courseNamepg3']
										                       },
										                      {              $set: { 
										                                              "valuestry.$.total" : total,
										                                              "valuestry.$.count" : count,
										                                              "valuestry.$.CoPoMatrix" : copomatrix,
										                                              "valuestry.$.Poattainment" : poattain
										                                }
										                      },
										                      { upsert : true }
										                      );



									});//mongo.dbo.collection('POAttainment').find({poID : '1'},{"valuestry.try1.insidetry2.value" : 1}


							///}//if myobj['po1'] > 0 && myobj['po1'] <= 3 --check r


				///});//mongo.dbo.collection('CourseOutcome').find({ courseID:myobj['courseID']},{"valuestry.$.overallAttain" -- check r       

	///});//mongo.connect --check r

});// --check mongo.connect 2nd wala

res.redirect('/poattainment');


});

/////////////////////router.get this is diff part
router.get('/poattainment',function(req,res){
   mongo.connect( function( err ) {
   mongo.dbo.collection('CourseOutcome').find().toArray(function(err , COrows){
        if (err) return console.log(err)
         res.render('poattainment', {obj1:COrows});

        console.log("poattainment doc read");
    });
   });  

});
//////////////////////////









app.post('/virtualPage15',function(req,res){
console.log(req.body);
  
  console.log("virtual page 15 has been pohochaoahed");


  var myobj={};
   myobj['courseName'] = req.body.courseName;
   myobj['year'] = parseFloat(req.body.year);

   mongo.connect(function(err) {
     mongo.dbo.collection('CourseOutcome').find({"courseName" : req.body.courseName}).toArray(function(err , rows){
         console.log("is this the real rows ?? dan dan daaannnn",rows);
               
               var pdfMaker = require('pdf-maker');
   var template = '/copdf';
   var data = {
    rows
  };
  var pdfPath = '/file.pdf';
  var option = {
    
        paperSize: {
            format: 'A4',
            orientation: 'portrait',
            border: '1.8cm'
        }
    };


 pdfMaker(template, data, pdfPath, option);

        });
   });


   
 
  res.redirect('/copdf'); 



  //////trying the pdf generation with phantonjs

  var phantom = require('phantom');   

  phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
          page.open("views/copdf.html").then(function(status) {
            console.log("inside the open")
              page.render('google.pdf').then(function() {
                  console.log('Page Rendered');
                  ph.exit();
              });
          });
      });
  });

   //using POST REDIRECT GET

});

router.get('/copdf',function(req,res){
mongo.connect(function(err) {  
  mongo.dbo.collection('CourseOutcome').find().toArray(function(err , rows){
  if (err) return console.log(err)
  
    var ejs = require('ejs');
    var phantom = require('phantom');   

    var webPage = require('webpage');
    

  var html = res.render('copdf', {obj:rows});
        console.log("Scheme doc read");

    
    //var page = webPage.create();
    
      webPage.content = html;
      console.log("what is inside", html );
      //page.content = html;

      //webPage.render('test.pdf');

     
      
    });
   });

});

//app.use('/report', page6.COReport);