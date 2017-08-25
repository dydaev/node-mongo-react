import React from 'react';

import NoteEditor from './notes-editor.jsx';

const NotesGrid = ({ notes }) => {
	return (
		<div>
		<h1>Notes grid</h1>
		{notes.map( (note, ind) => <NoteEditor key={ind} {...note} />)}
		</div>
)}

export default NotesGrid;
