import React from "react";
import Letter from "./letter";
import LoginForm from "./login-form";


/*import KeywordSuggest from "./keyword-suggest";*/

class App extends React.Component {

	render() {
		const {letters, current} = this.props.letters;
		const { username } = this.props.user;

		return (
			<div className="app">
				{username === null ? <LoginForm {...this.props} /> : username}

				<Letter current={current} letter={letters[current]} onSelect={this.props.onSelect} total={letters.length - 1} />
{/*				<KeywordSuggest {...this.props} /> */}
			</div>
		);
	}
}

App.propTypes = {
	letters: React.PropTypes.object,
	user: React.PropTypes.object,
	onSelect: React.PropTypes.func
};

export default App;