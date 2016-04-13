import React from "react";


class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: ""
		};
	}

	onNameChange(ev) {
		this.setState({username: ev.target.value});
	}

	onPassChange(ev) {
		this.setState({password: ev.target.value});
	}


	render() {

		return (
			<div className="login-form">
				<input placeholder="Enter username" onChange={this.onNameChange.bind(this)} value={this.state.username} />
				<input type="password" placeholder="Enter password" onChange={this.onPassChange.bind(this)} value={this.state.password} />
				<button onClick={() => this.props.onLogin(this.state.username, this.state.password)}>Login</button>
			</div>
		);
	}
}

LoginForm.propTypes = {

};

export default LoginForm;