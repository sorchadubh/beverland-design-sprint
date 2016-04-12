import React from "react";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			keywordSearch: ""
		};
	}

	onChange(ev) {
		this.setState({
			keywordSearch: ev.target.value
		});
	}

	handleKeyPress(ev) {
		if (ev.key === 'Enter') {
			this.props.onSearch(this.state.keywordSearch);
		}
	}

	render() {
		console.log(this.props)
		return (
			<div className="app">
				<input onChange={this.onChange.bind(this)} value={this.state.keywordSearch} onKeyPress = {this.handleKeyPress.bind(this)}  />
				<button onClick={() => this.props.onSearch(this.state.keywordSearch)}>Search keyword in inpho</button>
			</div>
		);
	}
}

export default App;