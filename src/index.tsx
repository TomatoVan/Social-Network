import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let postsData = [
	{id: "1", message: "Hi, how are you", likes: '15'},
	{id: "2", message: "My first post?", likes: '20'},
]

let dialogsData = [
	{id: "1", name: "Michael"},
	{id: "2", name: "Andrey"},
	{id: "3", name: "Leon"},
	{id: "4", name: "Valera"},
	{id: "5", name: "Sasha"}
]

let messagesData = [
	{id: "1", message: "Hi"},
	{id: "2", message: "How are you?"},
	{id: "3", message: "Hello"}
]


ReactDOM.render(<App postsData={postsData} dialogsData={dialogsData} messagesData={messagesData}/>, document.getElementById('root'));

