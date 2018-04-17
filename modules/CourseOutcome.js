var mongo = require('./db.js');

module.exports.CourseOutcome = function (app){

 app.post('/CourseOutcome',function(req,res,next){
   
   console.log(req.body);

   var myobj={};
   myobj['courseName'] = req.body.courseName;
   myobj['courseID'] = req.body.courseID;
   myobj['text'] = req.body.text;
   myobj['year'] = parseFloat(req.body.year);
   myobj['indirectAttain'] = parseFloat(req.body.indirectAttain);

   mongo.connect(function (err){
	   mongo.dbo.collection('CourseOutcome').find({"courseID" : req.body.courseID}).toArray(function(err , rows){
	                  mongo.dbo.collection('CourseOutcome').updateOne(
	                      { courseID:myobj['courseID'] },
	                      {
	                          $set: { 
	                                    courseID : myobj['courseID'],
	                                    courseName : myobj['courseName']

	                                },
	                          $push:{

	                          			"valuestry": {
	                                    		year : myobj['year'],
	                                    		text : myobj['text'],
	                                    	    indirectAttain : myobj['indirectAttain'],
	                                    	    directAttain : 0,
	                                    	    overallAttain : 0
	                                    		}  
	                                }
	                      },
	                      { upsert : true }
	                      );

	      });
   });


  res.redirect('/coattain');  //using POST REDIRECT GET

 });	
};