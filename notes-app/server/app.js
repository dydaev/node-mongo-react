//base server script

import express from 'express';
import bodyParser from 'body-parser';

import * as db from './utils/dbUtils';

db.setUpConnection();

const app = express();
const port = 7000;

app.use( bodyParser.json() );

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


