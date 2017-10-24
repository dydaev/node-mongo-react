import React, {PureComponent} from 'react';
import NoteEditor from '../../components/noteEditor/index.jsx';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ReactDrager, { DragerField } from '../../components/react-drager';

import Styles from './styles.js';

class NotesGrid extends PureComponent
{
	constructor(props) {
		super(props);
		this.state = {
			notes: props.notes,
			isAddNote: false
		}
		this.maxSortKey = 0;
	}
	shouldComponentUpdate(nextProps, nextState){
		return nextProps.notes !== this.props.notes || nextState !== this.state.isAddNote
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			notes: nextProps.notes,
			isAddNote: this.state.isAddNote
		})
	}
	getNoteEditor() {
		return (
			<NoteEditor 
				newSortKey={(this.maxSortKey  + 1)}
				onNoteAdd={this.props.onNoteAdd}
				onNoteEdit={this.props.onNoteEdit}
				onNoteDelete={this.props.onNoteDelete}
				onCloseNewNoteEditor={this.handleAddNote.bind(this)}
			/>
		)
	}
	getButtonAddNote() {
		return (
			<FloatingActionButton 
				onClick={this.handleAddNote.bind(this)} 
				secondary={true} 
				style={ Styles.margeButton }
			>
				<ContentAdd />
			</FloatingActionButton>
		)
	}
	handleAddNote() {
		this.setState({isAddNote: !this.state.isAddNote});
	}
	render() {
		//console.log(this.state.notes)
		const magicStyle = {
			border: '1px solid gray',
			display: 'inline',
			padding: 3
		}
		return (
			<div>
				<h1>Notes grid</h1>
				<ReactDrager onUpdateSortKey={this.props.onUpdateSortKey}>
					{this.state.notes.map( (note, ind) => {
						this.maxSortKey = note.sortKey > this.maxSortKey 
						? note.sortKey : this.maxSortKey
						return(
							<DragerField key={note.sortKey} fieldId={note.sortKey}>
								<NoteEditor
									onNoteAdd={this.props.onNoteAdd}
									onNoteEdit={this.props.onNoteEdit}
									onNoteDelete={this.props.onNoteDelete}
									{...note} 
								/>
							</DragerField>
					)})}
				</ReactDrager>
				{this.state.isAddNote ? this.getNoteEditor() : this.getButtonAddNote()}
			</div>
		)
	}
}

export default NotesGrid;