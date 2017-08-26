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

class NoteEditor extends PureComponent
{
	constructor(props) {
		super(props);
		console.log("note-", this)
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
		this.setState({
			color: this.props.color || '#FFFFFF',
			text: this.props.text || undefined,
			title: this.props.title || undefined,
			isChanged: false
		})
	}
	handleDeleteNote(e) {
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
		const buttonStile = {
			width: 40,
    		height: 40,
			marginRight: 10,
		}
		const textItemStyle = {
			width: 200,
			color: "#ff4444"
		}
		const stylePaper = {
		 	height: 230,
			width: 240,
			margin: 20,
			textAlign: 'center',
			display: 'inline-block'
		}
		const popover = {
	      position: 'absolute',
	      zIndex: '2',
	    }
	    const cover = {
	      position: 'fixed',
	      top: '0px',
	      right: '0px',
	      bottom: '0px',
	      left: '0px',
	    }
    	const colorPicker = this.state.displayColorPicker
		? (<div style={ popover }>
          		<div style={ cover } onClick={ this.handleClosePicker.bind(this) }/>
          		<ChromePicker  onChange={this.handleChangeColor.bind(this)} color={this.state.color} />
        	</div>)
		: null
	    const newNoteButtons = (
	    		<div>
		    		<IconButton 
		    			label="Color" 
		    			style={ buttonStile } 
		    			onClick={ this.handleClickPicker.bind(this) }>
						<ColorPNG />
				    </IconButton>
			        { colorPicker }
					<IconButton 
						label="Save" 
						style={ buttonStile } 
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
				style={ Object.assign({backgroundColor:this.state.color}, stylePaper )}
				zDepth={2} 
				rounded={false} 
			>	
				<TextField
					id="title"
					disabled={this.state.isChanged ? false : true}
					onChange={this.handleCahgeTextField.bind(this)}
					style={textItemStyle}
	      			hintText="Title"
	      			value={this.state.title}
	    		/>
	    		<TextField
					id="text"
					disabled={this.state.isChanged ? false : true}
					onChange={this.handleCahgeTextField.bind(this)}
					style={textItemStyle}
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
