var mongo = require('./db.js');

module.exports.CourseObj = function (app){

 app.post('/CourseObj', isLoggedIn,function(req,res,next){
   
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



 function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
 } 




};