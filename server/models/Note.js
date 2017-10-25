var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
	title: {type: String},
	text: {type: String, required: true},
	color: {type: String},
	createAt: {type: Date},
	sortKey: {type: Number}
})

var Note = mongoose.model('Note', NoteSchema);
