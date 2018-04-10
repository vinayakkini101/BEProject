var mongo = require('./db.js');
console.log("Entered chartCode.js");

module.exports.chartCode = function(app){

    app.get('/chartsAA', function(req,res,next){

        function getData(){
            //use the find() API and pass an empty query object to retrieve all records
            var dataArray=[];

            mongo.connect( function( err ) {
                mongo.dbo.collection('CourseOutcome').find().toArray(function(err , rows){
                    if ( err ) throw err;
                    rows.forEach(function(rows,index){
                        
                        // console.log(rows.valuestry.length);
                        for(var p=0; p<rows.valuestry.length; p++)
                        {
                            dataArray.push({ "label":""+rows.valuestry[p].year , "value":rows.valuestry[p].overallAttain});
                        }
                    });
                    // console.log(dataArray);
                    res.json(dataArray);
                    
                });
            });
        }
    
        console.log("This statement gets executed before before DB conn even though it is written after the DB conn code!");
        getData();


    });
};