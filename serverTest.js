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

/*app.use(express.static(path+'/vendor'));
app.use(express.static('/css'));
app.use(express.static('/scss'));
app.use(express.static('/js'));
*/

/*app.use('/bootstrap', express.static(path+'/vendor'));
app.use('/bootstrap', express.static(path+'/vendor'));
app.use('/images', express.static(path+'/css'));
app.use('/images', express.static(path+'/scss'));
app.use('/images', express.static(path+'/js'));
*/

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

app.listen(3000,function(){
  console.log('Server running at Port 3000');
});

















