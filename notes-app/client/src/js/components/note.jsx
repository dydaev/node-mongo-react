import React from 'react';

const Note = ({title, text, color, date}) => {(
				<article classNmae={'note-' + color}>
					<header>
						<h3>{title}</h3>
						<p>{date}</p>
					</header>
					<p>{text}</p>
				</article>
)};

export default Note;
