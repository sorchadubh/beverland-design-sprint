import React from "react";
import ReactDOM from "react-dom";
import Letter from "./letter";
import LoginForm from "./login-form";
import KeywordInfo from "./keyword-info";

const parseD = (dateStr) => {
	const day = dateStr.substr(6, 2);
	const mon = dateStr.substr(4, 2);
	const year = dateStr.substr(0, 4);
	const dd = day === "00" ? "" : `${day}-`;
	const mm = mon === "00" ? "" : `${mon}-`;
	return `${dd}${mm}${year}`;
};

const openStyle = {position: "fixed", top: "0", left: "0", width: "25%", height: "100%", overflowY: "auto", backgroundColor: "#fff", borderRight: "1px solid black"};
const closedStyle = {position: "absolute", top: "0", left: "0", overflowY: "hidden", height: "20px"};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listOpen: false
		};
	}

	toggleOpen() {
		if(this.state.listOpen) {
			this.setState({listOpen: false}, () => { ReactDOM.findDOMNode(this).querySelector("#list").scrollTop = 0; });
		} else {
			this.setState({listOpen: true});
		}
	}

	onLetterJump(letter) {
		this.props.onLetterJump(letter._id);
		this.toggleOpen();
	}

	render() {
		const { letters, current, userKeywords } = this.props.letters;
		const { username } = this.props.user;


		return (
			<div className="app">
				<div id="list" style={this.state.listOpen ? openStyle : closedStyle}>
					<button onClick={this.toggleOpen.bind(this)}>{this.state.listOpen ? "Close": "List of letters"}</button>
					<ul>
						{letters.map((letter, i) => (<li key={i}>
								<a onClick={this.onLetterJump.bind(this, letter)}>{letter.Sender} to {letter.Addressee} ({parseD(letter.Date)})</a>
							</li>
						))}
					</ul>
				</div>
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
	onLetterJump: React.PropTypes.func,
	user: React.PropTypes.object
};

export default App;