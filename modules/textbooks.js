var mongo = require('./db.js');

module.exports.textbooks = function (app){

 app.post('/textbooks', isLoggedIn,function(req,res,next){
   
   console.log(req.body);

   var myobj={};
   myobj['text'] = req.body.text;
    // myobj['year'] = parseFloat(req.body.year);


   mongo.connect(function (err){

            mongo.dbo.collection('Course').updateOne(
                {courseID : courseData.courseID},
                {
                    $push: { 
                            textbooks : myobj['text'],
                            
                        },
                },
                { upsert : true }
                );
	        
   });




res.redirect('/textbooks');  //using POST REDIRECT GET

 });	



 function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
 }  




};