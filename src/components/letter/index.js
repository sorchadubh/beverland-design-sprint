import React from "react";

const parseD = (dateStr) => `${dateStr.substr(6, 2)}-${dateStr.substr(4, 2)}-${dateStr.substr(0, 4)}`;

class Letter extends React.Component {

	render() {
		const { letter, current, total, onSelect } = this.props;
		const nextLink = current < total ?
			<a onClick={() => onSelect(current + 1)}>&gt;&gt;</a> : null;

		const prevLink = current > 0 ?
			<a onClick={() => onSelect(current - 1)}>&lt;&lt;</a> : null;


		return (<div>
			<h2>
				{prevLink}
				H. Beverland to {letter.Addressee} ({parseD(letter.Date)})
				{nextLink}
			</h2>
			<ul>
				<li>
					<label>Addressee: </label>
					<span>{letter.Addressee}</span>
				</li>
				<li>
					<label>Date: </label>
					<span>{parseD(letter.Date)}</span>
				</li>

				<li>
					<label>City sent from: </label>
					<span>{letter["City send from"]}</span>
				</li>


				<li>
					<label>Current location: </label>
					<span>{letter["Current location"]}</span>
				</li>

				<li>
					<label>Incipit: </label>
					<span>{letter.Incipit}</span>
				</li>

				<li>
					<label>Keywords: </label>
					<span>TODO</span>
				</li>
			</ul>
		</div>);
	}
}

Letter.propTypes = {
	current: React.PropTypes.number,
	letter: React.PropTypes.object,
	onSelect: React.PropTypes.func,
	total: React.PropTypes.number
};

export default Letter;