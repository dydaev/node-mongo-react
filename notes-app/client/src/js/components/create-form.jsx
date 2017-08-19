import React from 'react';

const Form = () => {(
	<article>
	<form action="notes" method="post">
		<input type="text" name="title" placeholder="Title" size="30"/>
		<input type="text" name="color" placeholder="color" size="10"/>
		<textarea cols="30" name="text" rows="3" placeholder="text"></textarea>
		<input type="submit" value="Sent"/>
	</form>
	</article>
)}