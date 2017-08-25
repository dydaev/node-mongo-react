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
		this.state = {
			displayColorPicker: false,
			title: props.title || '',
			text: props.text || '',
			color: props.color || '#FFFFFF',
			isChanged: false
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
			[e.target.id]: e.target.value,
			isChanged: true
		 })
	}
	handleCancle() {
		this.setState({
			color: this.props.color || '#FFFFFF',
			text: this.props.text,
			title: this.props.title,
			isChanged: false
		})
	}
	handleChanging() {
		this.setState({ isChanged: true })
	}
	handleSubmit(e) {
		this.setState({ isChanged: false })
/*		onNoteAdd({
			title: this.state.title,
			color: this.state.color,
			text: this.state.text
		})*/
		alert("Saving... title: " + this.state.title + " & text: " + this.state.text )
	}
	render() {
		const buttonStile = {
			width: 60,
    		height: 60,
			marginRight: 10,
			padding: 10,
			marginTop: -2
		}
		const textItemStyle = {
			width: 200,
			color: "#ff4444"
		}
		const stylePaper = {
		 	height: 220,
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
					label="Delete">
					<ActionDelete />
				</IconButton>
	    	</div>
	    );


	    const Buttons = this.state.isChanged
	    	? newNoteButtons
	    	: noteButtons

		return (
			<div className="note-thumbnail">
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
			</div>
		)}
}

export default NoteEditor;
