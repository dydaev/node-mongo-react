import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConst from '../const/AppConstants';

const CHANGE_EVENT = 'change';

let _notes = [];
let _loadingError = null;
let _isLoading = true;

function formatNote(note) {
	return {
		id: note._id,
		title: note.title,
		text: note.text,
		color: note.color || '#FFFFFF',
		createdAt: note.createdAt
	};
}
const TaskStore = Object.assign({}, EventEmitter.prototype, {
	isLoading() {
		return _isLoading;
	},

	getNotes() {
		return _notes;
	},

	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListner(callback) {
		this.on(CHANGE_EVENT, callback)
	},

	removeChangeListner(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(action => {
	switch(action.type) {
		case AppConst.LOAD_NOTES_REQUEST: {
			_isLoading = true;
			
			TaskStore.emitChange();
			break;
		}
		case AppConst.LOAD_NOTES_SUCCESS: {
			_isLoading = false;
			_notes = action.notes.map( formatNote );
			_loadingError = null;

			TaskStore.emitChange();
			break;
		}
		case AppConst.LOAD_NOTES_FAIL: {
			_loadingError = action.error;

			TaskStore.emitChange();
			break;
		}
		default: {
			console.log("Stope:", 'No such handler');
		}
	}
});

export default TaskStore;
