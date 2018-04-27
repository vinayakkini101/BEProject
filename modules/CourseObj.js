var mongo = require('./db.js');

module.exports.CourseObj = function (app){

 app.post('/CourseObj', isLoggedIn,function(req,res,next){

	console.log(req.body.addmore);
    req.body.addmore.pop();
	console.log(req.body.addmore);

   mongo.connect(function (err){
	  
		// empty array before pushing new values
			mongo.dbo.collection('Course').updateOne(
			{"courseName": req.body.courseName},
			{
				$set: { 
						objectives : []
					},
			},
			{ upsert : true }
			);

		// now that its empty, push values
			mongo.dbo.collection('Course').updateOne(
			{"courseName": req.body.courseName},
			{
				$addToSet: { 
						objectives : { $each: req.body.addmore }

					},
			},
			{ upsert : true }
			);
						  
   });




res.redirect('/courseobj?course='+req.body.courseName);  //using POST REDIRECT GET

 });	



 function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
 } 




};