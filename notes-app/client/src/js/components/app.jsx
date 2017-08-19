import React from 'react';

import NoteEditor from 'notes-editor'
import NotesGrid from 'notes-grid'

const App = props => {(
	<section>
		<h1>Notes</h1>
		<NoteEditor />
		<NoteGrid />
	</section>
)}

export default App;
