const multer = require('multer');
var mongo = require('./db.js');

// console.log("Entered CO attainment vp");

module.exports.uploadFile = function(app){

 app.post('/uploadFile',function(req,res,next){
     

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
           }).single("fileUploader"); //Field name and max count




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

                }

          });


          res.redirect('/dashboard');

  });

}; 
