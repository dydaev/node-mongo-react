import AppDispatcher from '../dispatcher/AppDispatcher';
import Const from '../const/AppConstants';

import api from '../api';

const NoteActions = {
	loadNotes: function() {
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
	createNote: function(note) {
		api.createNote(note)
				.then(() => {
					this.loadNotes()
				})
				.catch(err => {
					console.log("Failed create note:", err);
				});
	},
	updateNote: function(note) {
		api.updateNote(note)
			.then(() => {
				this.loadNotes();
			})
			.catch(err => {
						console.log("Fail update note", err);
					});
	},
	updateNoteSortKey: function(data) {
		api.updateNoteSortKey(data)
			.then(() => {
				this.loadNotes();
			})
			.catch(err => {
						console.log("Fail update note sortKey", err);
					});
	},
	deleteNote: function(noteId) {
		api.deleteNote(noteId)
				.then(() => {
					this.loadNotes();
				})
				.catch(err => {
					console.log("Fail delete note", err);
				});
	}
};
export default NoteActions;