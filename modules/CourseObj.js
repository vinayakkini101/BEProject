var mongo = require('./db.js');

module.exports.CourseObj = function (app){

 app.post('/CourseObj',function(req,res,next){
   
   // console.log(req.body);

   // var myobj={};
   	// myobj['courseobjective'] = req.body.courseobjective;
    // myobj['year'] = parseFloat(req.body.year);

    // var courseobjective = [];
    if(req.body.hiddenaddmore.length > 0 )
    {
    	req.body.addmore.push.apply(req.body.addmore, req.body.hiddenaddmore);
    }
console.log(req.body);
    // req.body.hiddenaddmore.slice(-1,1);

   mongo.connect(function (err){
	  
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




res.redirect('/courseobj');  //using POST REDIRECT GET

 });	
};