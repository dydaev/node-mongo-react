import React from 'react';

import IconButton from 'material-ui/IconButton';

// import ColorPNG from 'material-ui/svg-icons/image/color-lens';
import ContentCheck from 'material-ui/svg-icons/navigation/check';
import ContentClose from 'material-ui/svg-icons/navigation/close';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionHome from 'material-ui/svg-icons/action/home';
import ColorPNG from 'material-ui/svg-icons/image/brush';

import Styles from './styles.js';
import { buttonsState } from '../../const/AppConstants.js'

const Buttons = ({ 	isNewNote,
					isChanged,
					changeButtonState,
					onCancle,
					onSaveNote,
					onDeleteNote,
					onChangeButtons,
					onOpenColorPicker
				}) => {
	const handleChangeButtonsToEditor = () => {
		onChangeButtons(buttonsState.CHANGING);
	}
	const handleChangeButtonsToConfirmer = () => {
		onChangeButtons(buttonsState.CONFIRM);
	}
	const handleChangeButtonsToNote = () => {
		onChangeButtons('');
	}
	const changingButtons = (<div>
		<IconButton 
			label="Color" 
			style={ Styles.buttonStile } 
			onClick={ onOpenColorPicker }>
			<ColorPNG />
	    </IconButton>
		<IconButton
			label="Save" 
			style={ Styles.buttonStile } 
			disabled={ !isChanged }
			onClick={ onSaveNote }>
			<ContentCheck />
		</IconButton>
		<IconButton 
			label="Cancle" 
			onClick={ onCancle }>
			<ContentClose />
		</IconButton>
	</div>);

	const noteButtons = (<div>
		<IconButton 
			label="Edit"
			onClick={ handleChangeButtonsToEditor }>
			<ActionEdit />
		</IconButton>
		<IconButton 
			label="Delete"
			onClick={ handleChangeButtonsToConfirmer }>
			<ActionDelete />
		</IconButton>
	</div>);
	const confirmAction = (<div>
		<IconButton 
			label="ok"
			onClick={ onDeleteNote }>
			<ContentCheck />
		</IconButton>
		<IconButton 
			label="cencle"
			onClick={ handleChangeButtonsToNote }>
			<ContentClose />
		</IconButton>
	</div>);
//<----------------------------RENDERING
	switch (changeButtonState) {
		case buttonsState.CHANGING:
		return (
			<div className="changing-buttons">
				{changingButtons}
			</div>
			)
			break;
		case buttonsState.CONFIRM:
		return (
			<div className="deleting-buttons">
				{confirmAction}
			</div>
			)
			break;
		default:
		return (
			<div className="note-buttons">
				{noteButtons}
			</div>
			)
	}
}

export default Buttons;