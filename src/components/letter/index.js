import React from "react";
import KeywordForm from "./form";


const parseD = (dateStr) => {
	const day = dateStr.substr(6, 2);
	const mon = dateStr.substr(4, 2);
	const year = dateStr.substr(0, 4);
	const dd = day === "00" ? "" : `${day}-`;
	const mm = mon === "00" ? "" : `${mon}-`;
	return `${dd}${mm}${year}`;
};

class Letter extends React.Component {

	renderTaxonomyEntry(entry, i) {
		return (<span className="less-dense" key={i}>
			← {entry}
		</span>);
	}

	render() {
		const { letter, current, total, onSelect, userKeywords } = this.props;
		const { username, id } = this.props.user;
		const nextLink = current < total ?
			<a onClick={() => onSelect(current + 1)}>&gt;&gt;</a> : null;

		const prevLink = current > 0 ?
			<a onClick={() => onSelect(current - 1)}>&lt;&lt;</a> : null;

		const keywordForm = (username && id) ?
			<KeywordForm {...this.props} /> : null;


		return (<div>
			<h2>
				{prevLink}
				{letter.Sender} to {letter.Addressee} ({parseD(letter.Date)})
				{nextLink}
			</h2>
			<ul className="letter-metadata">
				<li>
					<label>Addressee: </label>
					<span>{letter.Addressee}</span>
				</li>
				<li>
					<label>Date: </label>
					<span>{parseD(letter.Date)}</span>
				</li>

				<li>
					<label>Language: </label>
					<span>{letter["Language"]}</span>
				</li>


				<li>
					<label>Current location: </label>
					<span>{letter["Current location"]}</span>
				</li>

				<li>
					<label>Incipit: </label>
					<span style={{fontStyle: "italic"}}>{letter.Incipit}</span>
				</li>

				<li>
					<label>Keywords: </label>
					<ul>
						{(letter.keywords || []).map((k, i) => <li key={i}><a href={k.url} target="_blank">{k.label}</a>{k.taxonomyEntry.map(this.renderTaxonomyEntry.bind(this))}</li>)}
					</ul>
				</li>
				<li>
					<label>User keywords: </label>
					<ul>
						{(userKeywords || []).map((k, i) => <li key={i}><a>{k.label}</a>{k.taxonomyEntry.map(this.renderTaxonomyEntry.bind(this))}</li>)}
					</ul>
					{keywordForm}
				</li>
			</ul>
		</div>);
	}
}

Letter.propTypes = {
	current: React.PropTypes.number,
	letter: React.PropTypes.object,
	onSelect: React.PropTypes.func,
	total: React.PropTypes.number,
	user: React.PropTypes.object,
	userKeywords: React.PropTypes.array
};

export default Letter;