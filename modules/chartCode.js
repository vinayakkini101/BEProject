var mongo = require('./db.js');
console.log("Entered chartCode.js");

module.exports.chartCode = function(app){

    app.get('/chartsAA', function(req,res,next){

        function getData(){
            //use the find() API and pass an empty query object to retrieve all records
            var dataArray=[];
            var categories=[];
            
            mongo.connect( function( err ) {

                if(req.query.course != undefined)
                {
                    // console.log(req.query.course);
                    mongo.dbo.collection('CourseOutcome').find({"courseName": req.query.course}).toArray(function(err , rows){
                        if ( err ) throw err;
                        rows.forEach(function(rows,index){
                            
                            console.log(rows);
                            var valArray=[];
                           
                            for(var p=0; p<rows.valuestry.length; p++)
                            {
                                 valArray.push({"value": ""+rows.valuestry[p].overallAttain});
                            }

                            dataArray.push({ "seriesname":""+rows.valuestry[index].year , "data": valArray});
                            categories.push({"label": ""+rows.courseID})

                        });

                        // console.log(dataArray);
                        res.json( dataArray );

                    });
                }
                else
                {
                    var multiValueArray = req.query.user.split(',');
                    //  console.log(multiValueArray);
                    mongo.dbo.collection('CourseOutcome').find({ "courseName" : { $in : multiValueArray }}).toArray(function(err , rows){
                        if ( err ) throw err;
                        rows.forEach(function(rows,index){
                            
                            // console.log(rows.valuestry.length);
                            for(var p=0; p<rows.valuestry.length; p++)
                            {
                                dataArray.push({ "label":""+rows.valuestry[p].year+"\n"+rows.courseName , "value":rows.valuestry[p].overallAttain});
                            }
                        });
                        // console.log(dataArray);
                        res.json(dataArray);
                    
                        });
                }

            });
        }
    
        console.log("This statement gets executed before before DB conn even though it is written after the DB conn code!");
        getData();


    });
};
