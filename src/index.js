import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import actions from "./actions";
import letters from "./letters";
import App from "./components";

document.addEventListener("DOMContentLoaded", () => {
	store.subscribe(() =>
		ReactDOM.render(<App {...store.getState()} {...actions} letters={letters} />, document.getElementById("app"))
	);

	ReactDOM.render(<App {...store.getState()} {...actions} letters={letters} />, document.getElementById("app"));
});