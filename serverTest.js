/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/




/*var express = require('express');
var app = express();
app.get('/', function (req, res) {
res.send('<h1>Open Source For You!</h1>');
});
app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});
*/



var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname;
app.use('/',router);
app.set('view engine', 'ejs');
app.use(express.static(path+'/public'));


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password:'',
	database:'BEProject'
});

connection.connect(function(error){
	if(!!error){
		console.log('Error');
	}else{
		console.log('Connected');
	}
});




router.get('/',function(req,res){
  res.sendFile(path+'/index.html');
});

router.get('/login.html',function(req,res){
  res.sendFile(path+'/login.html');
});

router.get('/syllabus.html',function(req,res){
  res.sendFile(path+'/syllabus.html');
});

router.get('/syllabusScheme.html',function(req,res){
  res.sendFile(path+'/syllabusScheme.html');
});

router.get('/syllabusModules.html',function(req,res){
  res.sendFile(path+'/syllabusModules.html');
});

router.post('/syllabusModules.html',function(req,res){
  res.sendFile(path+'/syllabusModules.html');
});


app.post('/syllabusModules.html',function(req,res){
  console.log(req.body);
  //res.sendFile(path+'/syllabusModules.html');
  //res.write('id is "'+req.body.modulename+'".\n');
  res.end();
});


app.listen(3000,function(){
  console.log('Server running at Port 3000');
});

















