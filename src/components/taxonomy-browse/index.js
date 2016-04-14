import React from "react";
import clone from "../../clone-deep";

const _getIn = (path, data) =>
	path.length === 0 ? data : _getIn(path, data[path.shift()]);


const getIn = (path, data) =>
	_getIn(clone(path), data);

class TaxonomyBrowse extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			path: []
		};
	}

	addIndex(idx) {
		const newPath = clone(this.state.path).concat([idx, "childConcepts"]);
		this.setState({path: newPath});
	}

	popIndex() {
		const newPath = clone(this.state.path).slice(0, this.state.path.length - 2);
		this.setState({path: newPath});
	}

	renderEntry(entry, i) {
		return (<li key={i}>
			<label>{entry.label}</label>
			<a onClick={this.addIndex.bind(this, i)}>→</a>
		</li>);
	}


	// { label="Turing Test",  taxonomyEntry=[3],  url="https://inpho.cogs.indiana.edu/idea/990"}
	onSelect() {
		const { taxonomy } = this.props;
		const entry = getIn(clone(this.state.path).slice(0, this.state.path.length - 1), taxonomy);
		const parents = this.getParentsByPath(taxonomy, clone(this.state.path)).reverse();
		parents.shift();

		this.props.onSelect({
			label: entry.label,
			taxonomyEntry: parents.map((e) => e.label),
			url: `https://inpho.cogs.indiana.edu${entry.url}`
		});
	}

	getParentsByPath(entries, path) {
		let out = [];
		while(path.length > 0) {
			const idx = path.shift();
			out.push(entries[idx]);
			entries = entries[idx].childConcepts;
			path.shift();
		}
		return out;
	}

	renderParents(entries, path) {

		return (<h3>
			<a onClick={this.popIndex.bind(this)}>←</a>
			{this.getParentsByPath(entries, path).map((o, i) => <span key={i}>{i > 0 ? "←" : ""} {o.label}</span>)}
			<button onClick={this.onSelect.bind(this)}>{this.props.buttonLabel}</button>
		</h3>);
	}

	render() {
		const { taxonomy } = this.props;
		const entries = getIn(this.state.path, taxonomy);
		const parentLink = this.state.path.length > 1 ?
			this.renderParents(clone(taxonomy), clone(this.state.path)) : null;

		return (
			<div>
				<h3>Browse Taxonomy</h3>
				{parentLink}
				<ul>{entries.map(this.renderEntry.bind(this))}</ul>
			</div>
		);
	}
}

TaxonomyBrowse.propTypes = {
	onSelect: React.PropTypes.func,
	taxonomy: React.PropTypes.array
};

export default TaxonomyBrowse;