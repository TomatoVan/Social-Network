import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {addPost, changeNewText, RootStateType, subscribe} from './redux/state';

export let onChange = () => {
	ReactDOM.render(<App state={state} addPost={addPost} changeNewText={changeNewText}/>, document.getElementById('root'));
}

onChange()
subscribe(onChange)
