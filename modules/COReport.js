/*var express = require('express');
var app = express();*/
var mongo = require('./db.js');

module.exports.COReport = function(app){
	app.post('/COReport',function(req,res,next){
				console.log(req.body);

				  var myobj={};
				   myobj['year'] = parseFloat(req.body.year);
				   myobj['courseName'] = req.body.courseName;

				   mongo.connect(function(err) {
				   	   console.log("inside mongoconnect");
					   

					   mongo.dbo.collection('CourseOutcome').find({"courseName" : req.body.courseName}).toArray(function(err , rows){

					   	console.log("trying to get it done", req.body.courseName);
					   	

					   		var row = [];
					   		var toolejs =[[]];
					   		
					   		 var i,j,k;
					   		console.log("yay",rows.length);
					   	for(i=0,len= rows.length; i<len;i++){

					   		//console.log("yay 1",rows[i]);
					   		console.log("yay 2222222222",rows[i].valuestry.length);

									for(j=0,len1=rows[i].valuestry.length; j<len1;j++){   
									   			console.log("inside if");
									   	if(rows[i].valuestry[j].year==parseFloat(req.body.year)){
									   		//console.log("heccckkkk",rows[i].valuestry[j]);
									   		row[i]  = rows[i].valuestry[j];
									   		console.log("heccckkkk",rows[i].valuestry[j]);

									   		console.log("tool length",rows[i].valuestry[j].tool.length);

									   		// for(k=0,len2=rows[i].valuestry[j].tool.length; k<len2;k++){

									   		// 		console.log("inside tool",rows[i].valuestry[j].tool[k]);
									   		// 		toolejs[j][k] = rows[i].valuestry[j].tool[k];


									   		// }

									   		var temp=[];
									   		for(k=0;k<rows[i].valuestry[j].tool.length;k++){
									   			temp.push(rows[i].valuestry[j].tool[k]);
									   		}
											toolejs.push(temp);									   				

									   	}
									   }
					   		
				 				   

				 		}

				 		//console.log("tool value chek ",toolejs['0']['0']);
				 				//if(rows['0'].valuestry['0']year == parseFloat(req.body.year)){
				 			//console.log("row value",row);
				 			res.render('reportprintco',{obj:row,obj1:rows,obj2:toolejs});
					      });
				   });
				  





	});

};