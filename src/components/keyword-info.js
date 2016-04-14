import React from "react";



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
				<li><h3>{info.keyword.label}</h3></li>
				<li>Created by {info.username} at {info.created}</li>
				<li>
					{info.keyword.label}
					{info.keyword.taxonomyEntry.map(this.renderTaxonomyEntry.bind(this))}
				</li>
				<li>
					<ul>
						{letters.filter((l) => l.userKeywords.indexOf(info.keyword._id) > -1).map((letter, i) => (
							<li key={i}>
								<a>{letter.Sender} to {letter.Addressee}</a>
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
	letters: React.PropTypes.object
};

export default KeywordInfo;
