import React, { PureComponent } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { GithubPicker } from 'react-color';
import Buttons from './buttons.jsx';
import { buttonsState } from '../../const/AppConstants.js';

import Styles from './styles.js';

class NoteEditor extends PureComponent
{
	constructor(props) {
		super(props);
		const isNewNote = props.onCloseNewNoteEditor !== undefined
		this.state = {
			id: props.id,
			title: props.title,
			style: Object.assign(Styles, props.stylse),
			text: props.text,
			color: props.color || '#FFFFFF',
			createData: props.createAt,
			buttonsState: isNewNote ? buttonsState.CHANGING : '',
			isChanged: false,
			displayColorPicker: false,
			isNewNote: isNewNote
		}
	}

	handleClickPicker() {
    	this.setState({ displayColorPicker: !this.state.displayColorPicker })
  	}
  	handleClosePicker() {
    	this.setState({ displayColorPicker: false })
  	}
	handleChangeColor(newColor) {
		this.setState({ 
			color: newColor.hex,
			isChanged: this.state.isNewNote ? this.state.isChanged : true
		});
	}
	handleCahgeTextField(e) {
		this.setState({ 
			[e.target.id]: e.target.value === '' ? undefined : e.target.value ,
			isChanged: true
		 })
	}
	handleCancle() {
		if (this.state.isNewNote) {
			this.props.onCloseNewNoteEditor();
		}
		this.setState({
			color: this.props.color || '#FFFFFF',
			text: this.props.text,
			title: this.props.title,
			displayColorPicker: false,
			buttonsState: '',
			isChanged: false
		})
	}
	handleDeleteNote(e) {
		if (this.state.isNewNote && this.state.isChanged) {
			this.props.onCloseNewNoteEditor();
		} else {
			this.props.onNoteDelete(this.props.id)
		}
	}
	handleChanging() {
		this.setState({ isChanged: true })
	}
	handleSubmit(e) {
		if (this.state.isNewNote) {
			this.props.onNoteAdd({
				title: this.state.title,
				color: this.state.color,
				text: this.state.text,
				sortKey: this.props.newSortKey
			})
			this.props.onCloseNewNoteEditor();
		} else {
			this.props.onNoteEdit({
				id: this.state.id,
				title: this.state.title,
				color: this.state.color,
				text: this.state.text,
				createAt: this.state.createData
			})
		}
		this.setState({ 
			buttonsState: '',
			displayColorPicker: false,
			isChanged: false 
		})
	}
	handleChangeButtons(newSateButtons) {
		this.setState({
			buttonsState: newSateButtons
		})
	}
	render() {
		// console.log("render note:", this.state.id)
		const colorPickerOrTextFields = this.state.displayColorPicker
			? (<div style={ Styles.popover }>
			  		<div style={ Styles.cover } onClick={ this.handleClosePicker.bind(this) }/>
			  		<GithubPicker triangle="hide" style={Styles.picker}  onChange={this.handleChangeColor.bind(this)} color={this.state.color} />
				</div>)
			: (<div>
					<TextField
						id="title"
						disabled={this.state.buttonsState !== buttonsState.CHANGING}
						onChange={this.handleCahgeTextField.bind(this)}
						style={Styles.textItemStyle}
		      			hintText="Title"
		      			value={this.state.title}
		    		/>
		    		<TextField

						id="text"
						disabled={this.state.buttonsState !== buttonsState.CHANGING}
						onChange={this.handleCahgeTextField.bind(this)}
						style={Styles.textItemStyle}
				     	hintText="Text"
				     	multiLine={true}
				     	rows={4}
				     	rowsMax={4}
				     	value={this.state.text}
				    />
			    </div>)

		return (
			<Paper 
			draggable="true"
				style={ Object.assign({backgroundColor:this.state.color}, Styles.stylePaper )}
				zDepth={2} 
				rounded={false} 
			>	
				{ colorPickerOrTextFields }
			    <Buttons
			    	isNewNote={this.state.isNewNote}
			    	isChanged={this.state.isChanged}
			    	changeButtonState={this.state.buttonsState}
			    	onCancle={this.handleCancle.bind(this)}
			    	onSaveNote={this.handleSubmit.bind(this)}
			    	onDeleteNote={this.handleDeleteNote.bind(this)}
			    	onChangeButtons={this.handleChangeButtons.bind(this)}
			    	onOpenColorPicker={this.handleClickPicker.bind(this)}
			    />
			</Paper>			
		)}
}

export default NoteEditor;
