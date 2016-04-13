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
		return (<li key={i}>
			<button onClick={() => this.props.onSelectKeyword(suggestion)}>Add keyword</button>
			<a href={suggestion.url} target="_blank">
				{suggestion.label}
			</a>
			{suggestion.taxonomyEntry.map(this.renderTaxonomyEntry.bind(this))}
		</li>);
	}
	render() {
		const { suggestions } = this.props.keywordSuggestions;

		return (
			<div className="suggestor">
				<div className="keyword-search">
					<input onChange={this.onChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} value={this.state.keywordSearch} />
					<button onClick={() => this.props.onSearch(this.state.keywordSearch)}>Search</button>
				</div>
				<ul className="keyword-suggestions">
					{suggestions.map(this.renderSuggestion.bind(this))}
				</ul>
			</div>
		);
	}
}

KeywordSuggest.propTypes = {
	keywordSuggestions: React.PropTypes.object,
	onSearch: React.PropTypes.func,
	onSelectKeyword: React.PropTypes.func
};

export default KeywordSuggest;