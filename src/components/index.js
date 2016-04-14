import React from "react";
import Letter from "./letter";
import LoginForm from "./login-form";


/*import KeywordSuggest from "./keyword-suggest";*/

class App extends React.Component {

	render() {
		const { letters, current, userKeywords } = this.props.letters;
		const { username } = this.props.user;
		const { info } = this.props.keyword;
		const infoBox = info ? 
			<ul style={{float: "right", width: "25%"}}><li><h3>{info.keyword.label}</h3></li><li>Created by {info.username} at {info.created}</li></ul> :
			null;

		return (
			<div className="app">
				{username === null ? <LoginForm {...this.props} /> : <span className="login-form">{`Logged in as ${username}`}</span>}
				{infoBox}
				<Letter {...this.props} current={current} letter={letters[current]} onSelect={this.props.onSelect} total={letters.length - 1} userKeywords={userKeywords} />
			</div>
		);
	}
}

App.propTypes = {
	keyword: React.PropTypes.object,
	letters: React.PropTypes.object,
	onSelect: React.PropTypes.func,
	user: React.PropTypes.object
};

export default App;