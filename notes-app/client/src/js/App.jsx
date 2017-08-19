import React, { Component } from 'react';

import NoteEditor from './components/notes-editor.jsx'
import NotesGrid from './components/notes-grid.jsx'

class App extends Component
{
	constructor(props){
		super(props);
	}
	
	render() {
		return(
			<section>
				<h1>Notes</h1>
				<NoteEditor />
				<NotesGrid />
			</section>
	)}
}

export default App;
