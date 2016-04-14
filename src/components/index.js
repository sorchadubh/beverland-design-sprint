import React from "react";
import Letter from "./letter";
import LoginForm from "./login-form";
import KeywordInfo from "./keyword-info";

/*import KeywordSuggest from "./keyword-suggest";*/

class App extends React.Component {

	render() {
		const { letters, current, userKeywords } = this.props.letters;
		const { username } = this.props.user;


		return (
			<div className="app">
				{username === null ? <LoginForm {...this.props} /> : <span className="login-form">{`Logged in as ${username}`}</span>}
				<KeywordInfo {...this.props} />
				<Letter {...this.props} current={current} letter={letters[current]} onSelect={this.props.onSelect} total={letters.length - 1} userKeywords={userKeywords} />
			</div>
		);
	}
}

App.propTypes = {
	letters: React.PropTypes.object,
	onSelect: React.PropTypes.func,
	user: React.PropTypes.object
};

export default App;