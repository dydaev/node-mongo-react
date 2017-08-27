import React, {PureComponent} from 'react';
import NoteEditor from '../../components/noteEditor';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class NotesGrid extends PureComponent
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
	shouldComponentUpdate(nextProps, nextState){
		return nextProps.notes !== this.props.notes || nextState !== this.state.isAddNote
	}
	componentWillReceiveProps(nextProps){
		this.setState({notes: nextProps.notes,
			onNoteAdd: this.state.onNoteAdd,
			onNoteEdit: this.state.onNoteEdit,
			onNoteDelete: this.state.onNoteDelete,
			isAddNote: this.state.isAddNote})
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
		console.log
		this.setState({isAddNote: !this.state.isAddNote});
	}
	render() {
		return (
			<div>
				<h1>Notes grid</h1>
				{this.state.notes.map( (note, ind) => {
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