var mongo = require('./db.js');

module.exports.addCourse = function(app){

 app.post('/addCourse',function(req,res,next){

  console.log(req.body);

  var myobj={};
   myobj['courseID'] = req.body.courseID;
   myobj['courseName'] = req.body.courseName;
   myobj['depID'] = req.body.depName;

   mongo.connect(function(err) {
        mongo.dbo.collection('Course').updateOne(
            { courseID:myobj['courseID'] },
            {
                $set: { 
                        courseID : myobj['courseID'],
                        courseName : myobj['courseName'],
                        depID: myobj['depID']  
                    }
            },
            { upsert : true }
        );
        
        mongo.dbo.collection('departments').updateOne(
            { depID:myobj['depID'] },
            {
                $push: { 
                            "courseArray": myobj['courseID']
                        }
            },
            { upsert : true }
        );

   });
 
  res.redirect('/dashboard');  //using POST REDIRECT GET

 });
};