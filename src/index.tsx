import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './redux/reduxStore';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App/>
		</Provider>
	</HashRouter>, document.getElementById('root'));


/*
state={store.getState()} dispatch={store.dispatch.bind(store)}*/
