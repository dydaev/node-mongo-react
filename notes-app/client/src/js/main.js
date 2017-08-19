import React from 'react';
import ReactDom from 'react-dom';

import {App} from './components/app';

class MyComponent extends React.Component {
	render() {
		return <App />
	}
}
 
ReactDom.render(<MyComponent />, document.getElementById('main'));
