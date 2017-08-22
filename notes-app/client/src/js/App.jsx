import React from 'react';
import ReactCreateClass from 'create-react-class';

import NoteStore from './stores/noteStore.js';
import NotesActions from './actions/NoteActions.js';

import NoteEditor from './components/notes-editor.jsx'
import NotesGrid from './components/notes-grid.jsx'


function getStateFromFlux() {
	return {
		isLoading: NoteStore.isLoading(),
		notes: NoteStore.getNotes()
	};
}
const App = ReactCreateClass({

	getInitialState() {
		return getStateFromFlux();
	},

	componentWillMount() {
		NotesActions.loadNotes();
	},

	componentDidMount() {
		NoteStore.addChangeListner(this._onChange);
	},

	componentWillUnmount() {
		NoteStore.removeChangeListner(this._onChange);
	},
	
	handleNoteAdd(data) {
		NotesActions.createNote(data);
	},

	_onChange() {
        this.setState(getStateFromFlux());
    },

	render() {
		return(
			<section>
				<h1>Notes</h1>
				<NoteEditor onNoteAdd={this.handleNoteAdd} />
				<NotesGrid />
			</section>
	)}

});

export default App;
