import React, { PureComponent } from 'react';

class DragerField extends PureComponent
{
	constructor(props) {
		super(props);
		this.style = {
			margin: 13,
			opacity: 1,
			border: 0,
			padding: 0,
			display: "inline-block"
		};
		this.selectedStyle = {
			margin: this.style.margin - 1,
			opacity: 0.2,
			border: "1px dashed gray"
		};
		this.state = {
			children: props.children,
			style: this.style
		}
		this.id = props.fieldId;
		this.handleDrag = this.handleDrag.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({children: nextProps.children})
	}
	handleDrag(e) {
		this.setState({
			style: Object.assign({},this.style, this.selectedStyle)
		})
		return true;
	}
	render(){

		return (
			<div
				id={this.id}
				style={this.state.style}
				onDragStart={this.handleDrag}
			>
					{this.state.children}
			</div>
		)
	}
}

export default DragerField;