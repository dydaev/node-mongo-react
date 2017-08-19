import React from 'react';

const handleTextChange = e => {
	
}

const Form = ({ title='', text='', color="#FFFFFF"}) => {
	let titleInput = '';//must be equal id tag for working method onChangeInput
	let colorInput = '';
	let textArea = '';
	
	const onChangeInput = e => {
		const element = eval(e.target.id)
		console.log(element.value)
		element.value = element.value + "-"
	}

	return (
		<form action="notes" method="post">
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
			
			<input type="submit" value="Sent"/>
		</form>
)}

export default Form;
