import React, { PureComponent } from 'react';

class ReactDrager extends PureComponent
{
	constructor(props) {
		super(props);
		if (props.children.find( child => child.type.name !== "DragerField")) {
			console.warn(`Component ReactDrager should by comprise childrens DragerField. 
				Use (import ReactDrager, { DragerField } from ...) `);
			return false;
		}
		this.state = {
			children: props.children
		}
		this.dragElementId = 10;
		this.allowDrop = this.allowDrop.bind(this);
		this.drop = this.drop.bind(this);
		this.changeSortKeys = this.changeSortKeys.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({children: nextProps.children})
	}
	shouldComponentUpdate(nextProps, nextState) {
	 	return true	
	}
	allowDrop(e) {
		// e.preventDefault();
		if (e.target.draggable === true && this.dragElementId !== (e.target.parentNode.id * 1)) {
			this.changeSortKeys(this.dragElementId, e.target.parentNode.id * 1)
			console.log(this.dragElementId , "->", (e.target.parentNode.id * 1))

/*			console.log("onDragOver", e.target.parentNode.id, 
				" offsetLeft-", e.target.offsetLeft, 
				" offsetTop-", e.target.offsetTop,
				" offsetRight-", e.target.offsetLeft + e.target.offsetWidth, 
				" offsetBottom -", e.target.offsetTop + e.target.offsetHeight, 
				" screenX-", e.screenX,
				" screenY-", e.screenY);*/
		}
	}
	drop(e) {
		e.preventDefault();
		const data = e.dataTransfer.getData("text");
    	e.target.appendChild(document.getElementById(data));
    	console.log("onDrop");
	}
	handleDragLeave(e) {
		if (e.target.draggable === true) {
			console.log("drag leave")
		}
	}
/*	Default sort use props sortKey
*/	
	changeSortKeys( keyChildA, keyChildB) {
		const childB = this.state.children.find(child => child.key == keyChildB)
		const childBId = childB.props.children.props.id
		this.setState({
			children: this.state.children.map( child => {
				console.log('CHI-', child)
				if(child !== undefined){				
					if ( child.props.children.props.sortKey == keyChildA ) {
						console.log("change key", child.props.children.props.sortKey)
						return Object.assign({}, ...child, {props: { children: {props: {sortKey: keyChildB}}}})
					}
					if ( child.props.children.props.id == childBId ) {
						return Object.assign({}, ...child, {props: { children: {props: {sortKey: keyChildA}}}})
					}
				}
			})
		})
	}
	sortFunction(a, b) {
		return b.props.children.props.sortKey - a.props.children.props.sortKey;
	}
	render() {
		return (
			<div onDrop={this.drop} onDragEnter={this.allowDrop} onDragLeave={this.handleDragLeave}>
				{this.state.children
					.sort(this.props.sortFunction || this.sortFunction)
					.map( (child, ind) => {
						const childProps = child.props.children.props;
						console.log(child)
						return Object.assign( {}, child, {})
					})
				}
			</div>
		)
	}
}

export default ReactDrager;