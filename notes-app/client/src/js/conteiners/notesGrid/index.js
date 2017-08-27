import React, {PureComponent} from 'react';
import NoteEditor from '../../components/noteEditor';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class NotesGrid extends PureComponent
{
	constructor(props) {
		super(props);
		console.log("super-props:", props)
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
			/>
		)
	}
	getButtonAddNote() {
		const style = {marginRight: 20}
		return (
			<FloatingActionButton 
				onClick={this.handleAddNote.bind(this)} 
				secondary={true} 
				style={ style }
			>
				<ContentAdd />
			</FloatingActionButton>
		)
	}

	handleAddNote() {
		this.setState({isAddNote: !this.state.isAddNote});
	}
	render() {
		return (
			<div>
				<h1>Notes grid</h1>
				{this.state.notes.map( (note, ind) => {
					console.log("map-note:", note)
					return(
					<NoteEditor 
						key={ind}
						onNoteAdd={this.state.onNoteAdd}
						onNoteEdit={this.state.onNoteEdit}
						onNoteDelete={this.state.onNoteDelete}
						{...note} 
					/>
				)})}
				{this.state.isAddNote ? this.getNoteEditor() : this.getButtonAddNote()}
			</div>
		)
	}
}

export default NotesGrid;