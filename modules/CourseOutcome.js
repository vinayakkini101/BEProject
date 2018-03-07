var express = require('express');
var app = express();
var mongo = require('./db.js');

module.exports.CourseOutcome = function (req, res, next){

   console.log(req.body);

   var myobj={};
   myobj['courseName'] = req.body.courseName;
   myobj['courseID'] = req.body.courseID;
   myobj['text'] = req.body.text;
   myobj['indirectAttain'] = parseFloat(req.body.indirectAttain);

   mongo.connect(function (err){
	   mongo.dbo.collection('CourseOutcome').find({"courseID" : req.body.courseID}).toArray(function(err , rows){
	                  mongo.dbo.collection('CourseOutcome').updateOne(
	                      { courseID:myobj['courseID'] },
	                      {
	                          $set: { 
	                                    courseID : myobj['courseID'],
	                                    courseName : myobj['courseName'],
	                                    text : myobj['text'],
	                                    indirectAttain : myobj['indirectAttain']    
	                                }
	                      },
	                      { upsert : true }
	                      );

	      });
   });


  res.redirect('/coattain');  //using POST REDIRECT GET
};