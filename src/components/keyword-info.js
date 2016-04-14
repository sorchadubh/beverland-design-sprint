import React from "react";

const parseD = (dateStr) => {
	const day = dateStr.substr(6, 2);
	const mon = dateStr.substr(4, 2);
	const year = dateStr.substr(0, 4);
	const dd = day === "00" ? "" : `${day}-`;
	const mm = mon === "00" ? "" : `${mon}-`;
	return `${dd}${mm}${year}`;
};

class KeywordInfo extends React.Component {

	renderTaxonomyEntry(entry, i) {
		return (<span className="less-dense" key={i}>
			← {entry}
		</span>);
	}

	render() {
		const { info } = this.props.keyword;
		const { letters } = this.props.letters;
		if (info) {
			console.log();
		}
		return info ? (
			<ul className="keyword-info">
				<li><h3>Keyword: {info.keyword.label}</h3></li>
				<li>Created by {info.username} at {info.created}</li>
				<li>
					<div>Hierarchy:</div>
					<div style={{padding: "0.8em"}}>
						{info.keyword.label}
						{info.keyword.taxonomyEntry.map(this.renderTaxonomyEntry.bind(this))}
					</div>
				</li>
				<li>
					Letters linked to this keyword:
					<ul>
						{letters.filter((l) => l.userKeywords.indexOf(info.keyword._id) > -1).map((letter, i) => (
							<li key={i}>
								<a onClick={() => this.props.onLetterJump(letter._id)}>
									{letter.Sender} to {letter.Addressee} ({parseD(letter.Date)})
								</a>
								<div>{letter.Incipit}</div>
							</li>
						))}
					</ul>
				</li>

			</ul>
		) : null;
	}
}

KeywordInfo.propTypes = {
	keyword: React.PropTypes.object,
	letters: React.PropTypes.object,
	onLetterJump: React.PropTypes.func
};

export default KeywordInfo;
