var mongo = require('./db.js');
var bcrypt   = require('bcrypt-nodejs');

module.exports.addTeacher = function(app){

 app.post('/addTeacher',function(req,res,next){

  console.log(req.body);

  var myobj={};
   myobj['email'] = req.body.teacherEmail;
   myobj['password'] = req.body.teacherPass;
   myobj['password'] = bcrypt.hashSync(myobj['password'], bcrypt.genSaltSync(8), null);
   myobj['name'] = req.body.teacherName;
   myobj['department'] = req.body.depID;

   mongo.connect(function(err) {
        mongo.dbo.collection('users').updateOne(
            { email:myobj['email'] },
            {
                $set: { 
                        email : myobj['email'],
                        password : myobj['password'],
                        name: myobj['name'],
                        department: myobj['department'],
                        courseArray: []  
                    }
            },
            { upsert : true }
        );
        
        mongo.dbo.collection('departments').updateOne(
            { depID:myobj['department'] },
            {
                $push: { 
                            "teacherArray": myobj['email']
                        }
            },
            { upsert : true }
        );

   });
 
  res.redirect('/dashboard');  //using POST REDIRECT GET

 });
};