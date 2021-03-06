//base server script

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./utils/dbUtils');

db.setUpConnection();

var app = express();
var port = require('../etc/config.json').serverPort;
var path = require('path');

app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.set('view engine', 'ejs');
//app.set(express.static(path.join(__dirname, 'pablic')));
//app.use(express.static('/public'));
app.use("/public", express.static(path.join(__dirname, 'public')));
//console.log(__dirname + '/public' );
app.get('/notes', (req, res) => {
	db.listNotes()
		.then( data => res.send(data))
});

app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/notes', (req, res) => {
	db.createNote(req.body)
			.then( data => res.send(data))
});

app.post('/notes/update', (req, res) => {
	console.log("app-", req.body)
	db.updateNote(req.body)
			.then( data => res.send(data))
});

app.delete('/notes/:id', (req, res) => {
	db.deleteNote(req.params.id)
			.then( data => res.send(data))
});

const server = app.listen(port, () => {
	console.log("Express server started on port ", port);
});


