var mongo = require('./db.js');

console.log("Entered coattain vp");


module.exports.COAttain = function(app){


  app.get('/coattain', function(req,res,next){

	var resultArray = [];
	var assert = require('assert');
    // mongo.connect(url, function(err, db) {
    //assert.equal(null, err);
    mongo.connect( function( err ) {
    	var cursor = mongo.dbo.collection('CourseOutcome').find();
    	

		    var PDFDocument = require('pdfkit');
		    var fs = require('fs');

		    var pdfdoc = new PDFDocument;    
		    // console.log(" new pdf doc variable");

		    //var pdfFile = path.join('reports/', 'out.pdf');
		    //var pdfStream = fs.createWriteStream('reports/out.pdf');


		    pdfdoc.pipe(fs.createWriteStream('reports/cosummary.pdf'));    
		    //console.log(" report generation");
		    //doc.font('fonts/PalatinoBold.ttf').fontSize(25).text(100, 100);

		    cursor.forEach(function(doc, err) {
		      // console.log(" isnde foreach");
		      assert.equal(null, err);
		      resultArray.push(doc);
		      // console.log(" report text added");
		    }, function() {

		      // console.log(" inside the ssssssssssssssssssssssssssssssssssssssssssssssssssss function");
		      pdfdoc.text('FR. Conceicao Rodrigues College Of Engineering', 145,20);
		      pdfdoc.moveDown();
		      pdfdoc.text('Father Agnel Ashram, Bandstand, Bandra-west, Mumbai-50', 125,32);
		      pdfdoc.moveDown();
		      pdfdoc.text('Department of Computer Engineering', 155,44);

		      console.log('length of resultArray is',resultArray.length);
		      // console.log('shiit',resultArray['2'].tool.length);

		      for(var i = 0, len = resultArray.length; i < len; i++)
		      {
		                pdfdoc.fontSize(12);
		                pdfdoc.text(resultArray[i].courseID,20,100+(i*180));
		                pdfdoc.text(resultArray[i].text,120,100+(i*180));
		                // console.log('i value',i);

		                // console.log('lengthhhhhhhhh',resultArray[i]);
		                if(resultArray[i].hasOwnProperty('tool'))
		                {
		                    // console.log('if ke unnnaddddddddaaarrrrrrrrrrrr');
		                    console.log('len1=',resultArray[i].tool.length);
		                    for(var j = 0, len1 = resultArray[i].tool.length; j < len1; j++)
		                    {
		                         // console.log('for ke undarrr');
		                         pdfdoc.text(resultArray[i].tool[j].toolName,(j+1)*90,150+(i*170));

		                          if(resultArray[i].hasOwnProperty('tool'))
		                          {

		                              for(var j = 0, len1 = resultArray[i].tool.length; j < len1; j++)
		                              {       pdfdoc.fontSize(10);
		                                      pdfdoc.text(resultArray[i].tool[j].toolName,(j+1)*90,150+(i*170));
		                                      //pdfdoc.text('Target:',20,10+(150*(i+1))+(j*75));

		                                  pdfdoc.text('target marks=' + resultArray[i].tool[j].targetMark,(j+1)*90,165+(i*170));
		                                  pdfdoc.text('target students=' + resultArray[i].tool[j].targetStud,(j+1)*90,180+(i*170));
		                                  pdfdoc.text('total students=' + resultArray[i].tool[j].totalStud,(j+1)*90,195+(i*170));
		                                  pdfdoc.text('min marks=' + resultArray[i].tool[j].minMark,(j+1)*90,210+(i*170));
		                                  pdfdoc.text('students secured=' + resultArray[i].tool[j].numStud,(j+1)*90,225+(i*170));
		                                  pdfdoc.text('attainment %=' + resultArray[i].tool[j].attainPercent,(j+1)*90,240+(i*170));
		                                  pdfdoc.text('attainment level=' + resultArray[i].tool[j].attainLevel,(j+1)*90,255+(i*170));
		                                  // console.log('inside for=',j);
		                                  pdfdoc.moveDown();

		                              }
		                          }  

		                      // console.log('outside for =',i);    
		                    }    


		                }
		          }  



			        mongo.dbo.collection('Course').find().toArray(function(err , rows){
			              if (err) return console.log(err)
			                console.log("coattain Course read");

			                mongo.dbo.collection('CourseOutcome').find().toArray(function(err , COrows){
			                if (err) return console.log(err)
			                 res.render('coattain', {obj2:COrows, obj1:rows});
			                      console.log("coattain CourseOutcome read");
			                      //console.log("co rows",COrows);
			                  });
			        });

		        // console.log('fs createWriteStream');

		        pdfdoc.end();

  });      // end bracket of cursor.forEach

});


  }); //app.post

};