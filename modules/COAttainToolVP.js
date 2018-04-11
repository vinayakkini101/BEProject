// var express = require('express');
// var app = express();
const multer = require('multer');
var mongo = require('./db.js');

console.log("Entered CO attainment vp");

module.exports.COAttainToolVP = function(app){

 app.post('/COAttainToolVP',function(req,res,next){
     
  //  create a storage which says where and how the files/images should be saved.
   var Storage = multer.diskStorage({

       destination: function(req, file, callback) {
           callback(null, "./uploads");
       },

       filename: function(req, file, callback) {
           callback(null, file.originalname);
       } 
   });



  //  create a multer object as follows
    var upload = multer({
       storage: Storage
   }).single("excelUploader"); //Field name and max count



  console.log(req.body);

  upload(req, res, function(err){
         if (err) 
         {
              console.log(err);
             console.log("Something went wrong!");
         }
         else
         {
            console.log("File uploaded sucessfully!.");
            console.log(req.file);

            if(typeof require !== 'undefined') XLSX = require('xlsx');
            var workbook = XLSX.readFile('uploads/'+req.file.originalname);
            console.log(workbook.SheetNames);


            var worksheet = workbook.Sheets[workbook.SheetNames[0]];
            var range = XLSX.utils.decode_range(workbook.Sheets[workbook.SheetNames[0]]["!ref"]);
            var sh = XLSX.utils.sheet_to_json(worksheet, {header:1, raw:true});

            // Locate column start
            var flag=0;
            for(var k=2; k<=range.e.r; k++)
            {
                for(var g=0; g<=range.e.c; g++)
                {
                    if(sh[k][g] == sh[1][1])
                    {
                        flag=1;
                        break;
                    }
                }
                if(flag==1)
                    break;
            }

            // Traverse down the column
            var totalStud=0, numStud=0;
            k++;  
            for(var p=k; p<=range.e.r; p++)
            {
                if( (parseFloat(sh[p][g])==undefined)  || typeof parseFloat(sh[p][g])=="string")
                  break; 
                if(parseFloat(sh[p][g]) >= parseFloat(sh[3][1]*sh[6][1]/100).toFixed(0))        
                  numStud++;
                totalStud++;
            }

            console.log("Successful Students = "+numStud);
            console.log("Total are = "+totalStud);
         }

         // Now we have "numStud" and "totalStud" , we will calculate directAttain and overallAtain

            var myobj={};
            myobj['courseID'] = req.body.courseID;
            myobj['year'] = parseFloat(sh[0][1]);

            var tempTool={};

            tempTool['weightage'] = parseFloat(sh[5][1]);
            tempTool['low'] = parseFloat(sh[9][1]);
            tempTool['mod'] = parseFloat(sh[8][1]);
            tempTool['high'] = parseFloat(sh[7][1]);

            tempTool['attainPercent'] = numStud / totalStud * 100;
            tempTool['attainPercent'] = parseFloat(tempTool['attainPercent']);       
            tempTool['attainPercent'] = tempTool['attainPercent'].toFixed(3);    

            if((tempTool['attainPercent'] >= tempTool['low']) && (tempTool['attainPercent'] < tempTool['mod']))
                tempTool['attainLevel'] = 1;
            else if((tempTool['attainPercent'] >= tempTool['mod']) && (tempTool['attainPercent'] < tempTool['high']))
                tempTool['attainLevel'] = 2;
            else 
                tempTool['attainLevel'] = 3;


            mongo.connect( function( err ) {
                mongo.dbo.collection('CourseOutcome').find({"courseID" : req.body.courseID , "valuestry.year" : myobj['year']}).toArray(function(err , rows){
                      if (err) return console.log(err)
                      
                        // when adding a tool for the first time, initialize directAttain to 0
                        var check=1;
                        
                           mongo.dbo.collection('CourseOutcome').find({"valuestry.year" : myobj['year'],"valuestry.directAttain":{"$exists":true}}).toArray(function(err, row){
                            if (err) return console.log(err)
                            var flag=4,len;
                            for(var i=0,len = row['0'].valuestry.length;i<len;i++){
                                  if(row['0'].valuestry[i].year == myobj['year'])
                                    {
                                      flag=2;
                                      break;
                                    }
                               }//for loop
                            //   console.log("eye is ",i);

                              //check=0;
                            //   console.log("Check "+check);
                                 
                                    tempTool['valuestry.directAttain'] = parseFloat(row['0'].valuestry[i].directAttain);
                                    tempTool['valuestry.directAttain'] = tempTool['valuestry.directAttain'] + ( tempTool['weightage'] * tempTool['attainLevel'] );  
                                    tempTool['valuestry.indirectAttain'] = parseFloat(row['0'].valuestry[i].indirectAttain);
                                    

                                    tempTool['valuestry.overallAttain'] = (0.8 * tempTool['valuestry.directAttain']) + (0.2 * tempTool['valuestry.indirectAttain']);
                                    // console.log("cheeccckkk",row['0'].valuestry[i]);

                  	                  mongo.dbo.collection('CourseOutcome').updateOne(
                  	                  {
                                        "courseID" : req.body.courseID,
                                        "valuestry.year" : parseFloat(sh[0][1])

                  	                  },
                  	                  {
                  	                      $set: {
                                                   
                  	                                "valuestry.$.directAttain" : parseFloat(tempTool['valuestry.directAttain'].toFixed(2)),
                  	                                "valuestry.$.overallAttain" : parseFloat(tempTool['valuestry.overallAttain'].toFixed(2))
                                                  
                  	                            },
                                          $push : {  
                                                   
                  	                                "valuestry.$.tool" : {
                  	                                            toolName : sh[2][1],
                  	                                            year : parseFloat(sh[0][1]),
                  	                                            targetMark : parseFloat(sh[3][1]),
                  	                                            targetStud : parseFloat(sh[4][1]),
                  	                                            weightage : parseFloat(sh[5][1]),
                  	                                            minMark : parseFloat(sh[3][1]*sh[6][1]/100),
                  	                                            numStud : parseFloat(numStud),
                  	                                            totalStud : parseFloat(totalStud),
                  	                                            low : parseFloat(sh[9][1]),
                  	                                            mod : parseFloat(sh[8][1]),
                  	                                            high : parseFloat(sh[7][1]),
                  	                                            attainPercent : parseFloat(tempTool['attainPercent']),
                  	                                            attainLevel : parseFloat(tempTool['attainLevel'])
                  	                                         }
                                                          
                  	                            }

                  	                  },
                  	                  { upsert : true }
                  	                  );
                             
                        });   // "valuestry.directAttain":{"$exists":
    	             
                   });    // mongo.dbo.collection('CourseOutcome').find
              });  //  mongo.connect( 

            }); // upload()


       res.redirect('/coattain');  //using POST REDIRECT GET
   

 });  //app.post

}; //module.exports