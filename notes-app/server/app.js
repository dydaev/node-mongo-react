//base server script

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './utils/dbUtils';

db.setUpConnection();

const app = express();
const port = require('../etc/config.json').serverPort;

app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.get('/notes', (req, res) => {
	db.listNotes()
			.then( data => res.send(data))
});

app.post('/notes', (req, res) => {
	db.createNote(req.body)
			.then( data => res.send(data))
});

app.delete('/notes/:id', (req, res) => {
	db.deleteNote(req.params.id)
			.then( data => res.send(data))
});

const server = app.listen(port, () => {
	console.log("Express server started on port ", port);
});


