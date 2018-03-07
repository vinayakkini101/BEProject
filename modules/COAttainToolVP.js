var express = require('express');
var app = express();
var mongo = require('./db.js');
const multer = require('multer');

console.log("Entered CO attainment vp");

module.exports.COAttainToolVP = function(req,res,next){


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
            // var sheet_name = workbook.SheetNames[req.body.sheetNumber];
            /* Get worksheet */
            // var worksheet = workbook.Sheets[sheet_name];

            // Calculating range
            //Note:  0 == XLSX.utils.decode_col("A")
             // var range = XLSX.utils.decode_range(workbook.Sheets[sheet_name]["!ref"]);
            // range.s.r = parseInt(req.body.cellRow)-1;             
            // range.e.r =  range.s.r + 200;                       
            // range.s.c = XLSX.utils.decode_col(req.body.cellColumn);
            // range.e.c = XLSX.utils.decode_col(req.body.cellColumn);
            // var new_range = XLSX.utils.encode_range(range);
            // //console.log(new_range);         
            // var sh = XLSX.utils.sheet_to_json(worksheet, {header:1, raw:true, range:new_range});
            //console.log(sh);          // sh is an array of array of the column of the specified range

            // Looping through all the sheets
            for(var sheet_number=0 ; sheet_number < workbook.SheetNames.length ; sheet_number++ )
            {
                    var worksheet = workbook.Sheets[workbook.SheetNames[sheet_number]];
                    var range = XLSX.utils.decode_range(workbook.Sheets[workbook.SheetNames[sheet_number]]["!ref"]);
                    var sh = XLSX.utils.sheet_to_json(worksheet, {header:1, raw:true});
                    var flag=0;
                    for(var k=0; k<=range.e.r; k++)
                    {
                      for(var g=0; g<=range.e.c; g++)
                      {
                          if(sh[k][g] == req.body.columnName)
                            {
                               flag=1;
                               break;
                            }
                      }
                        if(flag==1)
                          break;
                    }
                if(flag==1)
                  break;
            }


            console.log("Working on the sheet - "+workbook.SheetNames[sheet_number]);
             var totalStud=0, numStud=0;
             k++;       //to start below the cell containing column name
            for(var p=k; p<=range.e.r; p++)
            {
                if( (sh[p][g]==undefined)  || typeof sh[p][g]=="string")
                  break; 
                if(sh[p][g] >= req.body.minMark)
                  numStud++;
                totalStud++;
            }

            console.log("Successful Students = "+numStud);
            console.log("Total are = "+totalStud);
         }

         // Now we have "numStud" and "totalStud" , we will calculate directAttain and overallAtain

         var myobj={};
         myobj['courseID'] = req.body.courseID;

           var tempTool={};
           tempTool['weightage'] = parseFloat(req.body.weightage);
           // tempTool['numStud'] = parseFloat(req.body.numStud);
           // tempTool['totalStud'] = parseFloat(req.body.totalStud);
           tempTool['low'] = parseFloat(req.body.low);
           tempTool['mod'] = parseFloat(req.body.mod);
           tempTool['high'] = parseFloat(req.body.high);


           tempTool['attainPercent'] = numStud / totalStud * 100;
           if(tempTool['attainPercent'] >= tempTool['low'] && tempTool['attainPercent'] < tempTool['mod'])
              tempTool['attainLevel'] = 1;
           else if(tempTool['attainPercent'] >= tempTool['mod'] && tempTool['attainPercent'] < tempTool['high'])
              tempTool['attainLevel'] = 2;
           else 
              tempTool['attainLevel'] = 3;


            mongo.connect( function( err ) {
                mongo.dbo.collection('CourseOutcome').find({"courseID" : req.body.courseID}).toArray(function(err , rows){
                      if (err) return console.log(err)
                      // console.log(rows.length);

                        // when adding a tool for the first time, initialize directAttain to 0
                        var check=1;
                           mongo.dbo.collection('CourseOutcome').find({directAttain:{"$exists":true}}).toArray(function(err, row){
                              check=0;
                          });
                    
                        console.log("Check "+check);

                          if(check == 1)
                              tempTool['directAttain'] = 0;
                          else
                              tempTool['directAttain'] = parseFloat(rows[0].directAttain);
                           console.log("Direct attain is "+tempTool['directAttain']);

                        // console.log(check);
                          tempTool['indirectAttain'] = parseFloat(rows[0].indirectAttain);
                          tempTool['directAttain'] = tempTool['directAttain'] + ( tempTool['weightage'] * tempTool['attainLevel'] );  
                          // console.log(tempTool['directAttain']);
                          tempTool['overallAttain'] = (0.8 * tempTool['directAttain']) + (0.2 * tempTool['indirectAttain']);


        	                  mongo.dbo.collection('CourseOutcome').updateOne(
        	                  { courseID:myobj['courseID'] },
        	                  {
        	                      $set: {
        	                                directAttain : tempTool['directAttain'],
        	                                overallAttain : tempTool['overallAttain']
        	                            },

        	                      $push: { 
        	                                "tool" : {
        	                                            toolName : req.body.tool,
        	                                            year : parseFloat(req.body.year),
        	                                            targetMark : parseFloat(req.body.targetMark),
        	                                            targetStud : parseFloat(req.body.targetStud),
        	                                            weightage : parseFloat(req.body.weightage),
        	                                            minMark : parseFloat(req.body.minMark),
        	                                            numStud : parseFloat(numStud),
        	                                            totalStud : parseFloat(totalStud),
        	                                            low : parseFloat(req.body.low),
        	                                            mod : parseFloat(req.body.mod),
        	                                            high : parseFloat(req.body.high),
        	                                            attainPercent : tempTool['attainPercent'].toFixed(3),
        	                                            attainLevel : tempTool['attainLevel']
        	                                         }
        	                            }
        	                  },
        	                  { upsert : true }
        	                  );

    	             
                   });    // mongo.dbo.collection('CourseOutcome').find
              });  //  mongo.connect( 

            }); // upload()


       res.redirect('/coattain');  //using POST REDIRECT GET
   

 };