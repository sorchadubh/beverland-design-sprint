import React from "react";
import KeywordSuggest from "../keyword-suggest";

const modes = {
	ADD: "add-keyword",
	SEARCH: "search-keyword"
};

class KeywordForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mode: modes.SEARCH,
			newKeyword: "",
			parentConcept: null
		};
	}

	setMode(mode) {
		this.setState({mode: mode});
	}

	renderTaxonomyEntry(entry, i) {
		return (<span key={i}>
			← {entry}
		</span>);
	}


	onNewKeyWordChange(ev) {
		this.setState({newKeyword: ev.target.value});
	}

	setParentConcept(suggestion) {
		this.setState({parentConcept: suggestion});
	}

	saveNewKeyword() {
		const newKeyword = {
			label: this.state.newKeyword,
			taxonomyEntry: [this.state.parentConcept.label].concat(this.state.parentConcept.taxonomyEntry),
			parentUrl: this.state.parentConcept.url
		};
		this.props.onSaveKeyword(newKeyword);
		this.setState({newKeyword: "", parentConcept: null, mode: modes.SEARCH});
	}

	render() {
		const addSuggester =
			this.state.parentConcept ? null :
			<KeywordSuggest {...this.props}
				buttonLabel="Select this parent concept"
				onSelectKeyword={this.setParentConcept.bind(this)}
				useUserSuggest={false} />;

		const parentConcept =
			this.state.parentConcept ?
				<span>← {this.state.parentConcept.label}
					{this.state.parentConcept.taxonomyEntry.map(this.renderTaxonomyEntry.bind(this))}
					<button onClick={this.setParentConcept.bind(this, null)}>X</button>
				</span>
			: null;

		const saveButton = this.state.parentConcept && this.state.newKeyword.length > 2 ?
			<div><button onClick={this.saveNewKeyword.bind(this)}>Save</button></div> : null;

		const form = this.state.mode === modes.ADD ?
			(<div>
				<input onChange={this.onNewKeyWordChange.bind(this)} placeholder="Enter name..." type="text" value={this.state.newKeyword} />
				{parentConcept}
				{saveButton}
				{addSuggester}
			</div>) :
			<KeywordSuggest {...this.props} buttonLabel="Add this keyword" onSelectKeyword={this.props.onSelectKeyword} useUserSuggest={true} />;

		return (<div>
			<h3>Add keyword</h3>
			<input checked={this.state.mode === modes.SEARCH} id="search-keyword" onChange={this.setMode.bind(this, modes.SEARCH)} type="radio" />
			<label htmlFor="search-keyword">Search a keyword</label>
			<input checked={this.state.mode === modes.ADD} id="add-keyword" onChange={this.setMode.bind(this, modes.ADD)} type="radio" />
			<label htmlFor="add-keyword">Add a new user keyword</label>
			{form}
		</div>);
	}
}

KeywordForm.propTypes = {
	onSaveKeyword: React.PropTypes.func,
	onSelectKeyword: React.PropTypes.func
};

export default KeywordForm;