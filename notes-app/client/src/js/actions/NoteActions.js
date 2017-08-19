import AppDispatcher from '../dispatcher/AppDispatcher';
import Const form '../const/AppConstants';

import api from '../api';

const NoteActions = {
	loadNotes() {
		AppDispatcher.dispatch({
				type: Const.LOAD_NOTES_REQUEST
		});

		api.listNotes()
				.then(({ data }) => 
					AppDispatcher.dispatch({
						type: Const.LOAD_NOTES_SUCCESS,
						notes: data
					}))
				.catch( err => 
					AppDispatcher.dispatch({
						type: Const.LOAD_NOTES_FAIL,
						error: err
					}));
	},
	createNote(note) {
		api.createNote(note)
				.then(() => {
					this.loadNotes()
				})
				.catch(err => {
					console.log("Failed create note:", err);
				});
	},
	deleteNote(noteId) {
		api.deleteNote(noteId)
				.then(() => {
					this.loadNotes();
				})
				.catch(err => {
					console.log("Fail delete note", err);
				});
	}
};
