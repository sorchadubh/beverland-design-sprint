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

	renderTaxonomyEntry(entry, i) {
		return (<span key={i}>
			← {entry}
		</span>)
	}

	renderSuggestion(suggestion, i) {
		return (<li key={i}>
			<button>+</button>
			<a href={suggestion.url}>
				{suggestion.label}
			</a>
			{suggestion.taxonomyEntry.map(this.renderTaxonomyEntry.bind(this))}
		</li>);
	}

	renderLetter(letter, i) {
		return (<li key={i}>
			<dl>
				<dt>Addressee</dt><dd>{letter["Addressee"]}</dd>
				<dt>Date</dt><dd>{letter["Date"]}</dd>
			</dl>
		</li>)
	}

	render() {
		const { suggestions } = this.props.keywordSuggestions;
		const { offset, limit } = this.props.pagination;
		const { letters } = this.props;
		return (
			<div className="app">
				<div className="keyword-search">
					<input onChange={this.onChange.bind(this)} value={this.state.keywordSearch} onKeyPress = {this.handleKeyPress.bind(this)}  />
					<button onClick={() => this.props.onSearch(this.state.keywordSearch)}>Search keyword in inpho</button>
				</div>
				<ul className="keyword-suggestions">
					{suggestions.map(this.renderSuggestion.bind(this))}
				</ul>
				<ul className="letters">
					{letters.slice(offset, offset + limit).map(this.renderLetter.bind(this))}
				</ul>
			</div>
		);
	}
}

export default App;