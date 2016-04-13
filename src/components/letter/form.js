import React from "react";
import KeywordSuggest from "../keyword-suggest";

class KeywordForm extends React.Component {

	render() {
		return (<div>
			<h3>Add keyword</h3>
			<KeywordSuggest {...this.props} />
		</div>);
	}
}

export default KeywordForm;