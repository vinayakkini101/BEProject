var mongo = require('./db.js');

exports.examScheme = function(app){

    app.post('/virtualPage2',function(req,res){
    console.log(req.body);

    var myobj={};
    myobj['courseID'] = req.body.courseID;
    myobj['courseName'] = req.body.courseName;
    myobj['iatest1'] = parseInt(req.body.iatest1);
    myobj['iatest2'] = parseInt(req.body.iatest2);
    myobj['iatestavg'] = parseInt(req.body.iatestavg);
    myobj['endsem'] = parseInt(req.body.endsem);
    myobj['duration'] = parseInt(req.body.duration);
    myobj['tw'] = parseInt(req.body.tw);
    myobj['oral'] = parseInt(req.body.or);
    myobj['total'] = parseInt(req.body.total);
    
    mongo.connect( function( err ) {
        mongo.dbo.collection('Course').find({"courseID" : req.body.courseID}).toArray(function(err , rows){
                        mongo.dbo.collection('Course').updateOne(
                            { courseID:myobj['courseID'] },
                            {
                                $set: { 
                                            courseName : myobj['courseName'],
                                            InternalAssessmentTest_1 : myobj['iatest1'],
                                            InternalAssessmentTest_2 : myobj['iatest2'],
                                            InternalAssessmentTest_Avg : myobj['iatestavg'],
                                            EndSemesterExam : myobj['endsem'],
                                            duration : myobj['duration'],
                                            termWork : myobj['tw'],
                                            oral : myobj['oral'],
                                            total : myobj['total']
                                        }
                            },
                            { upsert : true }
                            );

            });
    });

    res.redirect('/syllabusScheme');  //using POST REDIRECT GET

    });



    app.get('/syllabusScheme',function(req,res){
    mongo.connect( function( err ) {    
        mongo.dbo.collection('SyllabusScheme').find().toArray(function(err , rows){
            if (err) return console.log(err)
            res.render('schemeData', {obj:rows});
                    console.log("Scheme doc read");
            });
        });
    });
}