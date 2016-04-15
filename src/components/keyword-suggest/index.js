import React from "react";

class KeywordSuggest extends React.Component {
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
		if (ev.key === "Enter") {
			this.props.onSearch(this.state.keywordSearch);
		}
	}

	renderTaxonomyEntry(entry, i) {
		return (<span key={i}>
			← {entry}
		</span>);
	}

	renderSuggestion(suggestion, i) {
		const link = suggestion._id ?
			<span>(User) <a onClick={() => this.props.onFocusKeyword(suggestion)}>{suggestion.label}</a></span> :
			<a href={suggestion.url} target="_blank">{suggestion.label}</a>;
		return (<li key={i}>
			<button onClick={() => this.props.onSelectKeyword(suggestion)}>
				{this.props.buttonLabel}
			</button>
			{link}
			{suggestion.taxonomyEntry.map(this.renderTaxonomyEntry.bind(this))}
		</li>);
	}

	render() {
		const { suggestions, userSuggestions, moreSuggestions, pending } = this.props.keywordSuggestions;
		const userSuggestionList = this.props.useUserSuggest ? userSuggestions.map(this.renderSuggestion.bind(this)) : null;
		const pendingMessage = pending ? <span style={{color: "#aaa"}}>Waiting for InPhO...</span> : null;
		return (
			<div className="suggestor">
				<div className="keyword-search">
					<input onChange={this.onChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} placeholder="Enter search..." value={this.state.keywordSearch} />
					<button onClick={() => this.props.onSearch(this.state.keywordSearch)}>Search</button>
				</div>
				<ul className="keyword-suggestions">
					{userSuggestionList}
					{moreSuggestions.map((m) => {delete m._id; return m}).concat(suggestions).map(this.renderSuggestion.bind(this))}
				</ul>
				{pendingMessage}
			</div>
		);
	}
}

KeywordSuggest.propTypes = {
	buttonLabel: React.PropTypes.string,
	keywordSuggestions: React.PropTypes.object,
	onFocusKeyword: React.PropTypes.func,
	onSearch: React.PropTypes.func,
	onSelectKeyword: React.PropTypes.func,
	useUserSuggest: React.PropTypes.bool
};

export default KeywordSuggest;