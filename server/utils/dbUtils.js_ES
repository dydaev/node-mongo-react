import mongoose from 'mongoose';

import '../models/Note';

const Note = mongoose.model('Note');

export function setUpConnection() {
	mongoose.connect('mongodb://localhost/notes');
}

export function listNotes() { 
	return Note.find();
}

export function createNote(data) { 
	const note = new Note({
			title: data.title,
			text: data.text,
			color: data.color,
			createAt: new Date(),
			sortKey: data.sortKey
	})
	console.log("Create note: ", note);
	return note.save();
}
export function updateNoteSortKey(data) { 
	console.log("Update sortKey: ", data)
	return Note.findOneAndUpdate({_id: data.id}, {
			sortKey: data.sortKey
	});
}
export function updateNote(data) { 
	return Note.findOneAndUpdate({_id: data.id}, {
			title: data.title,
			text: data.text,
			color: data.color
	});
}
export function deleteNote(id) { 
	return Note.findById(id).remove();
}
