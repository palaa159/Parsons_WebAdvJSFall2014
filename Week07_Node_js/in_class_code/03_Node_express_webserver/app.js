// Basic Web Server + API

// We will need 'Express' module
var express = require('express');
// Refer our server to 'app'
// Reference at http://expressjs.com/api.html
// http://erichonorez.wordpress.com/2013/02/04/a-basic-web-server-with-node-js-and-express/
var app = express();

// very few methods being used here: .use and .get
app.use(function(req, res, next) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log('incoming request from ---> ' + ip);
	var url = req.originalUrl;
	console.log('### requesting ---> ' + url);
	next();
});

app.use('/', express.static(__dirname + '/public'));

app.get('/api', function(req, res) {
	console.log('api hit');
	res.setHeader('Content-Type', 'application/json');
	res.send({msg: 'hello'});
	res.end();
});

app.get('/anotherApi', function(req, res) {
	function connectDB() {
		var data = 'Hologram';
		//connect to mongol, SQL
		//...
		//...
		return data;
	}
	res.send(connectDB);
	res.end();
});

app.listen(3000); //the port you want to use