var mongo = require('./db.js');

module.exports.CourseObj = function (app){

 app.post('/CourseObj',function(req,res,next){
   
   console.log(req.body);

   var myobj={};
   myobj['courseobjective'] = req.body.courseobjective;
    myobj['year'] = parseFloat(req.body.year);

    var courseobjective = [];

   mongo.connect(function (err){
	  
	                  mongo.dbo.collection('CourseObj').updateOne(
	                      {year : parseFloat(req.body.year)},
	                      {
	                          $push: { 
	                                    courseobjective : myobj['courseobjective'],
	                                    
	                                },
	                         
	                      },
	                      { upsert : true }
	                      );

	         
   });




res.redirect('/courseobj');  //using POST REDIRECT GET

 });	
};