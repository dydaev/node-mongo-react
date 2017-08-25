import React, { PureComponent } from 'react';

import Paper from 'material-ui/Paper';
import { ChromePicker } from 'react-color';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class NoteEditor extends PureComponent
{
	constructor(props) {
		super(props);
		this.state = {
			displayColorPicker: false,
			title: props.title,
			text: props.text,
			color: props.color || '#FFFFFF'
		}
	}

	handleClickPicker() {
    	this.setState({ displayColorPicker: !this.state.displayColorPicker })
  	}
  	handleClosePicker() {
    	this.setState({ displayColorPicker: false })
  	}
	handleChangeColor(newColor) {
		this.setState({ color: newColor.hex });
	}

	handleSubmit() {
		//console.log("push to state. {", titleInput.value + "-" + colorInput.value + "-" + textArea.value ,"}")
/*		onNoteAdd({
			title: document.querySelector("#titleInput").value,
			color: document.querySelector("#").value,
			text: document.querySelector("#textArea").value
		})*/
		alert("Saving... title:" + document.querySelector("#titleInput").value )
	}
	render() {
		const buttonStile = {
			marginRight: 10,
			marginTop: 1
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
		return (
			<div className="note-thumbnail">
			<Paper 
				style={ Object.assign({backgroundColor:this.state.color}, stylePaper )}
				zDepth={2} 
				rounded={false} 
			>	
				<TextField
					id="titleInput"
					style={textItemStyle}
	      			hintText="Title"
	      			value={this.state.title}
	    		/>
	    		<TextField
					id="textArea"
					style={textItemStyle}
			     	hintText="Text"
			     	multiLine={true}
			     	rows={4}
			     	rowsMax={4}
			     	value={this.state.text}
			    />
				<RaisedButton style={ buttonStile } label="Color" onClick={ this.handleClickPicker.bind(this) }/>
			    
		        { this.state.displayColorPicker ? 
		        	<div style={ popover }>
		          		<div style={ cover } onClick={ this.handleClosePicker.bind(this) }/>
		          		<ChromePicker  onChange={this.handleChangeColor.bind(this)} color={this.state.color} />
		        	</div> 
		        	: null }

				<RaisedButton label="Save" onClick={this.handleSubmit.bind(this)}/>
			</Paper>			
			</div>
		)}
}

export default NoteEditor;
