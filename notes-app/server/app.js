//base server script

import express from 'express';

const app = express();
const port = 7000;


app.get('/', (req, res) => {
	res.send("hello from express server home page")
});

const server = app.listen(port, () => {
	console.log("Express server started on port ", port);
});


