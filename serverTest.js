
var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname;
app.use('/',router);
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
const multer = require('multer');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://vinayakkini101:beproject@ds225608.mlab.com:25608/beproject';  

var dbo;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("beproject");			
  console.log("Connected to BEProject");
}); 





var port_number = app.listen(process.env.PORT || 7000);
app.listen(port_number,function(){
  console.log('Server running at Port 7000');
});


router.get('/',function(req,res){
  res.render('index');
});

router.get('/syllabus',function(req,res){
  res.render('syllabus');
});

router.get('/plans',function(req,res){
  res.render('plans');
});

router.get('/course',function(req,res){
  res.render('course');
});




// Syllabus Modules---------------------------------------------------

app.post('/virtualPage',function(req,res){
  console.log(req.body);
  var myobj={};
   myobj['courseID'] = req.body.courseID;
   myobj['moduleName'] = req.body.moduleName;
   myobj['hours'] = req.body.hours;
   myobj['content'] = req.body.content;
   dbo.collection("SyllabusModules").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 modules doc inserted");
   });
 
  res.redirect('/syllabusModules');  //using POST REDIRECT GET

});


router.get('/syllabusModules',function(req,res){
  dbo.collection('SyllabusModules').find().toArray(function(err , rows){
    if (err) return console.log(err)
    res.render('moduleData', {obj:rows});
          console.log("Module doc read");
    });
});






// Syllabus Examination Scheme-----------------------------------------------

app.post('/virtualPage2',function(req,res){
  console.log(req.body);

  var myobj={};
   myobj['courseID'] = req.body.courseID;
   myobj['courseName'] = req.body.courseName;
   myobj['iatest1'] = req.body.iatest1;
   myobj['iatest2'] = req.body.iatest2;
   myobj['iatestavg'] = req.body.iatestavg;
   myobj['endsem'] = req.body.endsem;
   myobj['duration'] = req.body.duration;
   myobj['tw'] = req.body.tw;
   myobj['or'] = req.body.or;
   myobj['total'] = req.body.total;
   dbo.collection('SyllabusScheme').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 scheme doc inserted");
   });
 
  res.redirect('/syllabusScheme');  //using POST REDIRECT GET

});



router.get('/syllabusScheme',function(req,res){
  dbo.collection('SyllabusScheme').find().toArray(function(err , rows){
  if (err) return console.log(err)
  res.render('schemeData', {obj:rows});
        console.log("Scheme doc read");
    });
});





// Lecture Schedule--------------------------------------------------------

app.post('/virtualPage3',function(req,res){
  console.log(req.body);
  var query = "INSERT INTO lectureSchedule(portion,eg,plannedDate,actualDate,delivery) VALUES(";
 query+= " '"+req.body.portion+"',";
 query+= " '"+req.body.example+"',";
 query+= " '"+req.body.pdate+"',";
 query+= " '"+req.body.adate+"',";
 query+= " '"+req.body.delivery+"')";

 connection.query(query, function(err,rows,fields){
    if(!!err){
	console.log('Error in the lecture insert query');
     }else{
	console.log('Successful lecture insert query');
      }
});

  res.redirect('/lecture');	//using POST REDIRECT GET

});




router.get('/lecture',function(req,res){
var q = "SELECT * FROM lectureSchedule";
  connection.query(q, function(err,rows){
      if(!!err){
	  console.log('Error in the read query');
       }else{
	  console.log('Successful read query');
        }

    res.render('lecData',{obj:rows});
  });
});



// Lab ---------------------------------------------------------------

app.post('/virtualPage4',function(req,res){
  console.log(req.body);
  var query = "INSERT INTO planLab(Expt,DateA,DateB,DateC,DateD,Concept,Aim) VALUES(";
 query+= " '"+req.body.expt+"',";
 query+= " '"+req.body.dateA+"',";
 query+= " '"+req.body.dateB+"',";
 query+= " '"+req.body.dateC+"',";
 query+= " '"+req.body.dateD+"',";
 query+= " '"+req.body.concept+"',";
 query+= " '"+req.body.aim+"')";

 connection.query(query, function(err,rows,fields){
    if(!!err){
	console.log('Error in the lab insert query');
     }else{
	console.log('Successful lab insert query');
      }
});

  res.redirect('/lab');	//using POST REDIRECT GET

});



router.get('/lab',function(req,res){
var q = "SELECT * FROM planLab";
  connection.query(q, function(err,rows){
      if(!!err){
	  console.log('Error in the lab read query');
       }else{
	  console.log('Successful lab read query');
        }

    res.render('labData',{obj:rows});
  });
});




// Assignments---------------------------------------------------------------

app.post('/virtualPage5',function(req,res){
  console.log(req.body);
  /*var query = "INSERT INTO assignment(question,subDate,givenDate) VALUES(";
 query+= " '"+req.body.question+"',";
 query+= " '"+req.body.givenDate+"',";
 query+= " '"+req.body.subDate+"')";

 connection.query(query, function(err,rows,fields){
    if(!!err){
	console.log('Error in the assignm insert query');
     }else{
	console.log('Successful assignm insert query');
      }*/

      var myobj={};
   myobj['question'] = req.body.question;
   myobj['givenDate'] = req.body.givenDate;
   myobj['subDate'] = req.body.subDate;
   dbo.collection("Assignments").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 MP doc inserted");

  });

  res.redirect('/ass');	//using POST REDIRECT GET

});


router.get('/ass',function(req,res){
    dbo.collection('Assignments').find().toArray(function(err , rows){
	if (err) return console.log(err)
	res.render('assData', {obj:rows});
        console.log("Ass doc read");
    });
});


// Mini Project---------------------------------------------------------------

app.post('/virtualPage6',function(req,res){
  console.log(req.body);

   var myobj={};
   myobj['mpDate'] = req.body.mpDate;
   myobj['activity'] = req.body.activity;
   dbo.collection("MiniProject").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 MP doc inserted");
   });
 
  res.redirect('/mp');	//using POST REDIRECT GET

});


router.get('/mp',function(req,res){

    dbo.collection('MiniProject').find().toArray(function(err , rows){
	if (err) return console.log(err)
    // console.log(rows[0].mpDate);
	res.render('mpData', {obj:rows});
        console.log("MP doc read");
    });
});





// CO Attainment Adding tools---------------------------------------------------------------

app.post('/virtualPage7',function(req,res){
  console.log(req.body);



upload(req, res, function(err) {
         if (err) {
             console.log("Something went wrong!");
         }
         else
         {
            console.log("File uploaded sucessfully!.");
            console.log(req.file);

            if(typeof require !== 'undefined') XLSX = require('xlsx');
            var workbook = XLSX.readFile('uploads/'+req.file.originalname);
            var sheet_name = workbook.SheetNames[req.body.sheetNumber];
            /* Get worksheet */
            var worksheet = workbook.Sheets[sheet_name];

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

            var range = XLSX.utils.decode_range(workbook.Sheets[sheet_name]["!ref"]);
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

             var totalStud=0, numStud=0;
             k++;       //to start below the cell containing column name
            for(var p=k; p<=range.e.r; p++)
            {
                if( (sh[p][g]==undefined)  || typeof sh[p][g]=="string")
                  break; 
                if(sh[p][g] >= req.body.minMark){
                  numStud++;

                }
                totalStud++;
            }

            console.log("Successful Students = "+numStud);
            console.log("Total are = "+totalStud);


            // var total=0, successCount=0;
            // for(var i=0; i<range.e.r; i++) 
            // {
            //   if( (sh[i][0]==undefined)  || typeof sh[i][0]=="string")
            //     break; 
            //   if(sh[i][0] >= 7.1)
            //     successCount++;
            //   total++;
            //   // console.log(sh[i][0]);
            // }
            // console.log("Successful Students = "+successCount);
            // console.log("Total are = "+total);
         }






         var myobj={};
         myobj['coID'] = req.body.coID;

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

            dbo.collection('CourseOutcome').find({"coID" : req.body.coID}).toArray(function(err , rows){
                  if (err) return console.log(err)
                  // console.log(rows.length);


                // when adding a tool for the first time, initialize directAttain to 0
                var check=1;
                  dbo.collection('CourseOutcome').find({directAttain:{"$exists":true}}).toArray(function(err, row){
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

                  dbo.collection('CourseOutcome').updateOne(
                  { coID:myobj['coID'] },
                  {
                      $set: {
                                directAttain : tempTool['directAttain'],
                                overallAttain : tempTool['overallAttain']
                            },

                      $push: { 
                                "tool" : {
                                            toolName : req.body.tool,
                                            targetMark : parseFloat(req.body.targetMark),
                                            targetStud : parseFloat(req.body.targetStud),
                                            weightage : parseFloat(req.body.weightage),
                                            minMark : parseFloat(req.body.minMark),
                                            numStud : parseFloat(numStud),
                                            totalStud : parseFloat(totalStud),
                                            low : parseFloat(req.body.low),
                                            mod : parseFloat(req.body.mod),
                                            high : parseFloat(req.body.high),
                                            attainPercent : tempTool['attainPercent'],
                                            attainLevel : tempTool['attainLevel']
                                         }
                            }
                  },
                  { upsert : true }
                  );

            });


       res.redirect('/coattain');  //using POST REDIRECT GET

           
     });     

  
});



  



// PO table---------------------------------------------------------------
app.post('/virtualPage10',function(req,res){
  console.log(req.body);

console.log("1 po doc");
  var myobj={};
   myobj['poID'] = req.body.poID;
   myobj['textpo'] = req.body.textpo;
   dbo.collection('POAttainment').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 po doc inserted");
   });
 
  res.redirect('/poattainment');  //using POST REDIRECT GET
});





// End of PO table---------------------------------------------------------------

// PO Attainment---------------------------------------------------------------
var overallAttainPO;
app.post('/virtualPage8',function(req,res){
  console.log(req.body);

  var myobj={};
  myobj['coID'] = req.body.coID;
   myobj['po1'] = req.body.po1;
   myobj['po2'] = req.body.po2;
    myobj['po3'] = req.body.po3;
   myobj['po4'] = req.body.po4;
    myobj['po5'] = req.body.po5;
   myobj['po6'] = req.body.po6;
    myobj['po7'] = req.body.po7;
   myobj['po8'] = req.body.po8;
    myobj['po9'] = req.body.po9;
   myobj['po10'] = req.body.po10;
    myobj['po11'] = req.body.po11;
   myobj['po12'] = req.body.po12;



    console.log(myobj['po12']);
//// coonditions for 0
if (myobj['po1'] == '' )
{
  myobj['po1'] = 0;
}
if (myobj['po2'] == '' )
{
  myobj['po2'] = 0;
}
if (myobj['po3'] == '' )
{
  myobj['po3'] = 0;
}
if (myobj['po4'] == '' )
{
  myobj['po4'] = 0;
}
if (myobj['po5'] == '' )
{
  myobj['po5'] = 0;
}
if (myobj['po6'] == '' )
{
  myobj['po6'] = 0;
}
if (myobj['po7'] == '' )
{
  myobj['po7'] = 0;
}
if (myobj['po8'] == '' )
{
  myobj['po8'] = 0;
}
if (myobj['po9'] == '' )
{
  myobj['po9'] = 0;
}
if (myobj['po10'] == '' )
{
  myobj['po10'] = 0;
}
if (myobj['po11'] == '' )
{
  myobj['po11'] = 0;
}
if (myobj['po12'] == '' )
{
  myobj['po12'] = 0;
}



/// insertion in the PO Table --- we hav to remove this block

 // myobj['poID'] = req.body.poID;
 //   myobj['text'] = req.body.text;
 //   dbo.collection('POAttainment').insertOne(myobj, function(err, res) {
 //      if (err) throw err;
 //      console.log("1  PO Value doc inserted");
 //   });

///// End of INsertions

//// end of conditions
   myobj['test'] = parseFloat(myobj['po12']) + parseFloat(myobj['po1']);


 myobj['total'] = parseFloat(myobj['po1']) + parseFloat(myobj['po2']) + parseFloat(myobj['po3']) + parseFloat(myobj['po4']) + parseFloat(myobj['po5']) + parseFloat(myobj['po6']) + parseFloat(myobj['po7']) + parseFloat(myobj['po8']) + parseFloat(myobj['po9']) + parseFloat(myobj['po10']) + parseFloat(myobj['po11']) + parseFloat(myobj['po12']);


/// putting in co table
 dbo.collection('CourseOutcome').find({"coID" : req.body.coID}).toArray(function(err , rows){
                  dbo.collection('CourseOutcome').updateOne(
                      { coID:myobj['coID'] },
                      {
                          

                          $push: { 
                                    "pos" : {
                                                po1 : myobj['po1'],
                                                po2 : myobj['po2'],
                                                po3 : myobj['po3'],
                                                po4 : myobj['po4'],
                                                po5 : myobj['po5'],
                                                po6 : myobj['po6'],
                                                po7 : myobj['po7'],
                                                po8 : myobj['po8'],
                                                po9 : myobj['po9'],
                                                po10 : myobj['po10'],
                                                po11: myobj['po11'],
                                                po12 : myobj['po12']



                                             }
                                }
                      },
                      { upsert : true }
                      );

               });

// this is the faulty part
// dbo.collection('CourseOutcome').find( { "pos": { po1:0, coID: "CSC302.1" } } ).toArray(function(err , rows){
// console.log(rows);
// });


//////testing overall attain


///gives the output as snapshot wala
/*dbo.collection('CourseOutcome').find({ coID:myobj['coID']},{overallAttain : 1, _id : 0,courseName : 0,coID :0 }).toArray(function(err , rows){
overallAttainPO = rows['0'].overallAttain;
console.log(rows['0'].overallAttain);
console.log(typeof(rows));

console.log(overallAttainPO);
 });
*/
/*function getOverallAttain() {
dbo.collection('CourseOutcome').find({ coID:myobj['coID']},{overallAttain : 1, _id : 0,courseName : 0,coID :0 }).toArray(function(err , rows){
overallAttainPO = rows['0'].overallAttain;
//return rows['0'].overallAttain;
console.log(rows['0'].overallAttain);
console.log(typeof(rows));

console.log('overall shhitt',overallAttainPO);
 //return overallAttainPO;
 });
// return 'did not work';
console.log('overall shhitt 11111',overallAttainPO);
} 

var x1 = getOverallAttain();
console.log('the outside function',x1);*/
//console.log(typeof(dbo.collection('CourseOutcome').find({ coID:myobj['coID']},{overallAttain : 1})));




///gives output
/*dbo.collection('POAttainment').aggregate([
   {
     $lookup:
       {
         from: "CourseOutcome",
         localField: myobj['coID'],
         foreignField: "overallAttain" ,
         as: "docs"
       }
  }
]).toArray(function(err , rows){
console.log(rows);
 });*/





/////////////////test block it is running 

//var arr1 = new Array();
dbo.collection('CourseOutcome').find({ coID:myobj['coID']},{overallAttain : 1, _id : 0,courseName : 0,coID :0 }).toArray(function(err , rows){
overallAttainPO = rows['0'].overallAttain;
//return rows['0'].overallAttain;
console.log(rows['0'].overallAttain);
console.log(typeof(rows));

console.log('overall shhitt',overallAttainPO);
 //return overallAttainPO;
 
if(myobj['po1'] > 0 && myobj['po1'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '1' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po1'],
                                                    overallAttain : overallAttainPO
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
//var total = 0,count=0;

////////////////total,count,co-po

dbo.collection('POAttainment').find({poID : '1'},{"try1.insidetry2.value" : 1}).toArray(function(err , rows){
console.log('INside the if of PO1',rows['0'].try1['0'].insidetry2.value);
console.log('before total');
var total = 0,count=0;
console.log('before for');
console.log(rows['0'].try1.length);
for (var i = 0, len = rows['0'].try1.length; i < len; i++) {

   total = total + parseFloat(rows['0'].try1[i].insidetry2.value);
   //console.log('this is total',total);
   count++;
   //console.log('this is counttt',count);
}

console.log('this is total',total);
console.log('this is counttt',count);

var copomatrix = total / count;


dbo.collection('POAttainment').updateOne(
                      { poID : '1' },
                      {              $set: { 
                                              "total" : total,
                                              "count" : count,
                                              "CoPoMatrix" : copomatrix
                                }
                      },
                      { upsert : true }
                      );




console.log('after for');
 });
//console.log('INside the if of PO1',arr1);

//console.log('this is counttt check',count);
///counting
/*dbo.collection('POAttainment').find({poID : '1'},{"try1.insidetry2.value" : 1}).toArray(function(err , rows){

 console.log('count',rows['0'].try1['1'].insidetry2.value);
 

 });*/



}



if(myobj['po2'] > 0 && myobj['po2'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '2' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po2']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
if(myobj['po3'] > 0 && myobj['po3'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '3' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po3']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
if(myobj['po4'] > 0 && myobj['po4'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '4' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po4']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
if(myobj['po5'] > 0 && myobj['po5'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '5' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po5']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
if(myobj['po6'] > 0 && myobj['po6'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '6' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po6']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
if(myobj['po7'] > 0 && myobj['po7'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '7' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po7']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
if(myobj['po8'] > 0 && myobj['po8'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '8' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po8']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
if(myobj['po9'] > 0 && myobj['po9'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '9' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po9']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
if(myobj['po10'] > 0 && myobj['po10'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '10' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po10']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
if(myobj['po11'] > 0 && myobj['po11'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '11' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po11']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
if(myobj['po12'] > 0 && myobj['po12'] <= 3){
dbo.collection('POAttainment').updateOne(
                      { poID : '12' },
                      {              $push: { 
                                    "try1" : {
                                                coID : req.body.coID,
                                                  "insidetry2":{
                                                    value : myobj['po12']
                                                  }
                                             }
                                }
                      },
                      { upsert : true }
                      );
}
});
//////////////////

/*
var results = dbo.collection('CourseOutcome').aggregate([

     // Un-wind the array's to access filtering 
     
     { "$unwind": "$CourseOutcome.pos" },
     { "$unwind": "$CourseOutcome.pos.po1" },

     // Group results to obtain the matched count per key
     { "$group": {
         "count": { "$sum": 1 }

     }}
    
 ],function(err, result){ 
    //some stuff
   
});


console.log(results);
*/



   
   /*dbo.collection('POAttainment').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 course doc inserted");
   });
*/ 
  res.redirect('/poattainment');  //using POST REDIRECT GET
});




router.get('/poattainment',function(req,res){
   
   dbo.collection('CourseOutcome').find().toArray(function(err , COrows){
        if (err) return console.log(err)
         res.render('poattainment', {obj1:COrows});

        console.log("poattainment doc read");
    });
});




// Course --------------------------------------------------------------

app.post('/virtualPage999',function(req,res){
  console.log(req.body);

  var myobj={};
   myobj['courseID'] = req.body.courseID;
   myobj['courseName'] = req.body.courseName;
   dbo.collection('Course').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 course doc inserted");
   });
 
  res.redirect('/coattain');  //using POST REDIRECT GET
});





router.get('/coattain',function(req,res){

   dbo.collection('Course').find().toArray(function(err , rows){
  if (err) return console.log(err)
        console.log("coattain hhhhdoc read");

        dbo.collection('CourseOutcome').find().toArray(function(err , COrows){
        if (err) return console.log(err)
         res.render('coattain', {obj2:COrows, obj1:rows});
              console.log("coattain kkkkdoc read");
          });
    });


});




// Course Outcome--------------------------------------------------------------

app.post('/virtualPage9',function(req,res){
  console.log(req.body);

  var myobj={};
   myobj['courseName'] = req.body.courseName;
   myobj['coID'] = req.body.coID;
   myobj['text'] = req.body.text;
   myobj['indirectAttain'] = req.body.indirectAttain;
   myobj['coID'] = req.body.coID;
   dbo.collection('CourseOutcome').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 course outcome doc inserted");
   });


  res.redirect('/coattain');  //using POST REDIRECT GET
});











// Test Excel upload--------------------------------------------------------------

router.get('/calculateCO',function(req,res){
        res.render('calculateCO');
        console.log("calculateCO doc read");

});



app.post('/UploadExcel', function(req,res){

     upload(req, res, function(err) {
         if (err) {
             console.log("Something went wrong!");
         }
         else
         {
            console.log("File uploaded sucessfully!.");
            console.log(req.file);

            if(typeof require !== 'undefined') XLSX = require('xlsx');
            var workbook = XLSX.readFile('uploads/'+req.file.originalname);
            var sheet_name = workbook.SheetNames[req.body.sheetNumber];
            /* Get worksheet */
            var worksheet = workbook.Sheets[sheet_name];

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

            var range = XLSX.utils.decode_range(workbook.Sheets[sheet_name]["!ref"]);
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

             var total=0, successCount=0;
             k++;       //to start below the cell containing column name
            for(var p=k; p<=range.e.r; p++)
            {
                if( (sh[p][g]==undefined)  || typeof sh[p][g]=="string")
                  break; 
                if(sh[p][g] > 7)
                  successCount++;
                total++;
            }

            console.log("Successful Students = "+successCount);
            console.log("Total are = "+total);


            // var total=0, successCount=0;
            // for(var i=0; i<range.e.r; i++) 
            // {
            //   if( (sh[i][0]==undefined)  || typeof sh[i][0]=="string")
            //     break; 
            //   if(sh[i][0] >= 7.1)
            //     successCount++;
            //   total++;
            //   // console.log(sh[i][0]);
            // }
            // console.log("Successful Students = "+successCount);
            // console.log("Total are = "+total);
         }
           
     });
     

  res.redirect('/calculateCO');  //using POST REDIRECT GET
});





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

// console.log(upload);
