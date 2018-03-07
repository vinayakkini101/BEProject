var express = require('express');
var app = express();
var mongo = require('./db.js');

module.exports.Course = function(req,res,next){
	console.log(req.body);

  var myobj={};
   myobj['courseID'] = req.body.courseID;
   myobj['courseName'] = req.body.courseName;

   mongo.connect(function(err) {
	   mongo.dbo.collection('Course').find({"courseID" : req.body.courseID}).toArray(function(err , rows){
	                  mongo.dbo.collection('Course').updateOne(
	                      { courseID:myobj['courseID'] },
	                      {
	                          $set: { 
	                                    courseID : myobj['courseID'],
	                                    courseName : myobj['courseName']     
	                                }
	                      },
	                      { upsert : true }
	                      );

	      });
   });
 
  res.redirect('/coattain');  //using POST REDIRECT GET
};