import React from 'react';
import ReactDom from 'react-dom';


class MyComponent extends React.Component {
	render() {
		return <div>Hello World arbuz</div>;
	}
}
 
ReactDom.render(<MyComponent />, document.getElementById('main'));
