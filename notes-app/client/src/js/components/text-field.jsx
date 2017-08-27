import React, { Component } from 'react';

class TextField extends Component
{
	constructor(props) {
		super(props);
		console.log("Field: ", props.notes)
		this.state = {
			notes: props.notes
		}
	}
	render() {
		return(
				<div>
					{this.state.notes.map( (note, ind) => {
						return(
							<div key={ind}>
								<input type="text" value={note.title} />
								<input type="text" value={note.text} />
							</div>
						)
					})}
				</div>
		)
	}
}

export default TextField;