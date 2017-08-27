import React, { PureComponent } from 'react';

import Paper from 'material-ui/Paper';
import { ChromePicker } from 'react-color';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCheck from 'material-ui/svg-icons/navigation/check';
import ContentClose from 'material-ui/svg-icons/navigation/close';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionHome from 'material-ui/svg-icons/action/home';
import ColorPNG from 'material-ui/svg-icons/image/brush';
// import ColorPNG from 'material-ui/svg-icons/image/color-lens';

import Styles from './styles.js';
class NoteEditor extends PureComponent
{
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			displayColorPicker: false,
			title: props.title || undefined,
			text: props.text || undefined,
			color: props.color || '#FFFFFF',
			isChanged: (props.title && props.text) ? false : true
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
			isChanged: true 
		});
	}
	handleCahgeTextField(e) {
		this.setState({ 
			[e.target.id]: e.target.value === '' ? undefined : e.target.value ,
			isChanged: true
		 })
	}
	handleCancle() {
		if (this.props.onCloseNewNoteEditor !== undefined && 
			this.state.text === undefined &&
			this.state.title === undefined) 
		{
			this.props.onCloseNewNoteEditor();
		}
		this.setState({
			color: this.props.color || '#FFFFFF',
			text: this.props.text || undefined,
			title: this.props.title || undefined,
			isChanged: false
		})
	}
	handleDeleteNote(e) {
		if (this.props.onCloseNewNoteEditor !== undefined && 
			this.state.text === undefined &&
			this.state.title === undefined) {
			this.props.onCloseNewNoteEditor();
		}
		this.props.onNoteDelete(this.props.id)
	}
	handleChanging() {
		this.setState({ isChanged: true })
	}
	handleSubmit(e) {
		this.setState({ isChanged: false })
		this.props.onNoteAdd({
			title: this.state.title,
			color: this.state.color,
			text: this.state.text
		})
		if (this.props.onCloseNewNoteEditor !== undefined) {
			this.props.onCloseNewNoteEditor();
		}
		// alert("Saving... title: " + this.state.title + " & text: " + this.state.text )
	}
	render() {
		
    	const colorPicker = this.state.displayColorPicker
		? (<div style={ Styles.popover }>
          		<div style={ Styles.cover } onClick={ this.handleClosePicker.bind(this) }/>
          		<ChromePicker  onChange={this.handleChangeColor.bind(this)} color={this.state.color} />
        	</div>)
		: null
	    const newNoteButtons = (
	    		<div>
		    		<IconButton 
		    			label="Color" 
		    			style={ Styles.buttonStile } 
		    			onClick={ this.handleClickPicker.bind(this) }>
						<ColorPNG />
				    </IconButton>
			        { colorPicker }
					<IconButton 
						label="Save" 
						style={ Styles.buttonStile } 
						disabled={this.state.text  === this.props.text && this.state.title === this.props.title}
						onClick={this.handleSubmit.bind(this)}>
						<ContentCheck />
					</IconButton>
					<IconButton 
						label="Cancle" 
						onClick={this.handleCancle.bind(this)}>
						<ContentClose />
					</IconButton>
				</div>
	    )

	    const noteButtons = (
	    	<div>
	    		<IconButton 
					label="Edit"
					onClick={this.handleChanging.bind(this)}>
					<ActionEdit />
				</IconButton>
	    		<IconButton 
					label="Delete"
					onClick={this.handleDeleteNote.bind(this)}>
					<ActionDelete />
				</IconButton>
	    	</div>
	    );


	    const Buttons = this.state.isChanged
	    	? newNoteButtons
	    	: noteButtons

		return (
			<Paper 
				style={ Object.assign({backgroundColor:this.state.color}, Styles.stylePaper )}
				zDepth={2} 
				rounded={false} 
			>	
				<TextField
					id="title"
					disabled={this.state.isChanged ? false : true}
					onChange={this.handleCahgeTextField.bind(this)}
					style={Styles.textItemStyle}
	      			hintText="Title"
	      			value={this.state.title}
	    		/>
	    		<TextField
					id="text"
					disabled={this.state.isChanged ? false : true}
					onChange={this.handleCahgeTextField.bind(this)}
					style={Styles.textItemStyle}
			     	hintText="Text"
			     	multiLine={true}
			     	rows={4}
			     	rowsMax={4}
			     	value={this.state.text}
			    />

			    {Buttons}
			</Paper>			
		)}
}

export default NoteEditor;
