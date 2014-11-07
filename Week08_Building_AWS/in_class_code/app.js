// Basic Web Server + API

// We will need 'Express' module
var express = require('express');
var fs = require('fs');
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
		// connect to Mongo, SQL
		// ..
		// ..
		return data;
	}

	res.send(connectDB());
	res.end();
});

app.get('/crystal', function(req, res) {
	console.log('----> food: ' + req.query.food);
	console.log('----> topping: ' + req.query.topping);
	console.log('----> protein: ' + req.query.protein);
	console.log('----> sides: ' + req.query.sides);

	var dataToSave = {
		food: req.query.food,
		topping: req.query.topping,
		protein: req.query.protein,
		sides: req.query.sides
	};
	// save above in json file
	fs.writeFile('crystal.json', JSON.stringify(dataToSave), function() {
		console.log('SAVED YAYYYY');
	});
});

app.listen(80); //the port you want to use


// HAHAHA

// check if apon.json exists?
// if not, create one with [] inside
// if exists, read a file, grab data == []

// var insideFile = fs.readFile('apon.json')
// // insideFile = [];

// insideFile.push(dataToSave);
// // insideFile = [{food: 'adsaga', 'topping': 'asdgdasg'}]

// fs.writeFile('apon.json', JSON.stringify(insideFile), fun() ;;)
