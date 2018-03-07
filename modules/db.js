console.log("Entered db.js");

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://vinayakkini101:beproject@ds225608.mlab.com:25608/beproject'; 
var dbo;

module.exports.connect = function connect(callback)
{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("beproject");     
    console.log("Connected to BEProject");
	module.exports.dbo = dbo;
	callback(err);

  });
};

