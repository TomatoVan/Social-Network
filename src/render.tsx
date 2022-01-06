import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {addPost, RootStateType} from './redux/state';

export let renderEntireTree = (state: RootStateType) => {
	ReactDOM.render(<App state={state} addPost={addPost}/>, document.getElementById('root'));
}

