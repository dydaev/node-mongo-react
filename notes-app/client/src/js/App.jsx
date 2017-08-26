import React from 'react';
import ReactCreateClass from 'create-react-class';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

	handleNoteDelete( id ) {
		console.log("deleting note id: ", id)

		NotesActions.deleteNote(id);
	},

	hamdleNoteEdit (data) {

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
									onNoteEdit={this.hamdleNoteEdit}
									onNoteDelete={this.handleNoteDelete} 
								/>
							</article>
					</section>
				</MuiThemeProvider>
	)}

});

export default App;
