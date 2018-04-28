var mongo = require('./db.js');

module.exports.LecturePlan = function (app){

 app.post('/LecturePlan', isLoggedIn,function(req,res,next){

 	console.log(req.body.addmore);
 	console.log(req.body.portion);
 	console.log(req.body.example);
 	console.log(req.body.planned);
 	console.log(req.body.actual);
 	console.log(req.body.method);


	
    req.body.addmore.pop();
    req.body.portion.pop();
    req.body.example.pop();
    req.body.planned.pop();
    req.body.actual.pop();
    req.body.method.pop();
	console.log(req.body.addmore);



	console.log("check",req.body.courseName);

   mongo.connect(function (err){
	  
		// empty array before pushing new values
			mongo.dbo.collection('Course').updateOne(
			{"courseName": req.body.courseName},
			{
				$set: { 
						lectureplan : {}
					},
			},
			{ upsert : true }
			);

		// now that its empty, push values
			mongo.dbo.collection('Course').updateOne(
			{"courseName": req.body.courseName},
			{
				$set: { 

					"lectureplan" : { 

						srno : req.body.addmore,
						portion : req.body.portion,
						example : req.body.example,
						planned : req.body.planned,
						actual : req.body.actual,
						method : req.body.method

					}

					},
			},
			{ upsert : true }
			);
						  
   });




res.redirect('/lectureplan?course='+req.query.course);  //using POST REDIRECT GET

 });	



 function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
 } 




};