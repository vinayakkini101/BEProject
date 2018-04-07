var mongo = require('./db.js');

console.log("Entered syllabusModules.js");

module.exports.syllabusModulesVP = function(app){

    app.post('/syllabusModulesVP', function(req,res,next){

        console.log(req.body);
    var myobj={};
    myobj['courseID'] = req.body.courseID;
    myobj['moduleName'] = req.body.moduleName;
    myobj['hours'] = parseInt(req.body.hours);
    myobj['content'] = req.body.content;


    mongo.connect( function( err ) {
        mongo.dbo.collection('Course').find({"courseID" : req.body.courseID}).toArray(function(err , rows){
                mongo.dbo.collection('Course').updateOne(
                    { courseID:myobj['courseID'] },
                    {
                        $set: { 
                                    "module" : {
                                                name : myobj['moduleName'],
                                                hours : myobj['hours'],
                                                content : myobj['content']
                                            }
                                }
                    },
                    { upsert : true }
                    );

            });
        });

        res.redirect('/syllabusModules');  //using POST REDIRECT GET

    });
    
};






