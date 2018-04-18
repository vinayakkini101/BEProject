var mongo = require('./db.js');

module.exports.assign = function(app){

 app.post('/assign',function(req,res,next){

  console.log(req.body);

  var myobj={};
   myobj['ID'] = req.body.teacherName;
   myobj['course'] = req.body.courseName;
  

   mongo.connect(function(err) {
        mongo.dbo.collection('Course').updateOne(
            { courseName:myobj['course'] },
            {
                $set: { 
                        teacher: myobj['ID']
                    }
            },
            { upsert : true }
        );
        
        // remove course from the previous teacher
        mongo.dbo.collection('users').updateOne(
            { courseArray:myobj['course'] },
            {
                $pull: { 
                            "courseArray": myobj['course']
                        }
            }
            // { upsert : true }
        );

        // assign a course to the new teacher
        mongo.dbo.collection('users').updateOne(
            { name:myobj['ID'] },
            {
                $push: { 
                            "courseArray": myobj['course']
                        }
            },
            { upsert : true }
        );

   });
 
  res.redirect('/dashboard');  //using POST REDIRECT GET

 });
};