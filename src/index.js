import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import actions from "./actions";
import taxonomy from "./taxonomy";
import App from "./components";

document.addEventListener("DOMContentLoaded", () => {

	store.subscribe(() =>
		ReactDOM.render(<App {...store.getState()} {...actions} taxonomy={taxonomy} />, document.getElementById("app"))
	);


	actions.fetchLetters();
});