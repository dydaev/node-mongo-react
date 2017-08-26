import React, {Component} from 'react';
import NoteEditor from './notes-editor.jsx';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class NotesGrid extends Component
{
	constructor(props) {
		super(props);
		this.state = {
			notes: props.notes,
			onNoteAdd: props.onNoteAdd,
			onNoteEdit: props.onNoteEdit,
			onNoteDelete: props.onNoteDelete,
			isAddNote: false
		}
	}
	getNoteEditor() {
		return (
			<NoteEditor 
				onNoteAdd={this.state.onNoteAdd}
				onNoteEdit={this.state.onNoteEdit}
				onNoteDelete={this.state.onNoteDelete}
				onCloseNewNoteEditor={this.handleAddNote.bind(this)}
			/>)
	}
	getButtonAddNote() {
		return (
			<FloatingActionButton 
				onClick={this.handleAddNote.bind(this)} 
				secondary={true} 
				style={ {marginRight: 20} }
			>
				<ContentAdd />
			</FloatingActionButton>
		)
	}

	handleAddNote() {
		this.setState({isAddNote: !this.state.isAddNote});
	}
	render() {
		console.log(this.state.notes)
		return (
			<div>
				<h1>Notes grid</h1>
				{this.state.notes.map( (note, ind) => (
					<NoteEditor 
						key={ind}
						onNoteAdd={this.state.onNoteAdd}
						onNoteEdit={this.state.onNoteEdit}
						onNoteDelete={this.state.onNoteDelete}
						{...note} 
					/>
				))}
				{this.state.isAddNote ? this.getNoteEditor() : this.getButtonAddNote()}
			</div>)
	}
}

export default NotesGrid;