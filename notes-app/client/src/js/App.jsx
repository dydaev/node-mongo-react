import React from 'react';
import ReactCreateClass from 'create-react-class';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NoteStore from './stores/noteStore.js';
import NotesActions from './actions/NoteActions.js';

import NotesGrid from './conteiners/notesGrid'

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

	handleNoteDelete( id ) {
		NotesActions.deleteNote(id);
	},

	handleNoteEdit (data) {
		console.log("Re-write note: ", data)
		NotesActions.updateNote(data);
	},

	_onChange() {
        this.setState(getStateFromFlux());
    },

	render() {
		return(
				<MuiThemeProvider>
					<section>
							<h1>Notes</h1>
							
							<article id="notes">
								<NotesGrid 
									notes={this.state.notes}
									onNoteAdd={this.handleNoteAdd}
									onNoteEdit={this.handleNoteEdit}
									onNoteDelete={this.handleNoteDelete}
								/>
							</article>
					</section>
				</MuiThemeProvider>
	)}

});

export default App;
