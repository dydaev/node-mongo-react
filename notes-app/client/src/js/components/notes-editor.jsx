import React from 'react';

const NoteEditor = ({ onNoteAdd, title='', text='', color="#FFFFFF" }) => {
	let titleInput = '';//must be equal id tag for working method onChangeInput
	let colorInput = '';
	let textArea = '';
	
	const onChangeInput = e => {
		const element = eval(e.target.id)
		element.value = element.value
	}

	const handleSubmit = () => {
		console.log("push to state. {", titleInput.value + "-" + colorInput.value + "-" + textArea.value ,"}")
		onNoteAdd({
			title: titleInput.value,
			color: colorInput.value,
			text: textArea.value
		})
	}

	return (
		<div>
			<input
				id="titleInput"
				onChange={onChangeInput}
				ref={input => titleInput = input} 
				type="text" 
				name="title" 
				placeholder="Title" 
				size="30"
			/>
			<input
				id="colorInput"
				onChange={onChangeInput}
				ref={input => colorInput = input} 
				type="text" 
				name="color" 
				placeholder="color" 
				size="10"
			/>
			<textarea
				id="textArea"
				onChange={onChangeInput}
				ref={area => textArea = area} 
				cols="30" 
				name="text" 
				rows="3" 
				placeholder="text">
			</textarea>
			
			<input type="submit" onClick={handleSubmit} value="Sent"/>
		</div>
)}

export default NoteEditor;
