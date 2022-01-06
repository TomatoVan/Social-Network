import {renderEntireTree} from "../render";

type MessageType = {
	id: number
	message: string
}

type DialogType = {
	id: number
	name: string
}

type PostType = {
	id: number
	message: string
	likes: number
}

type ProfilePageType = {
	postsData: Array<PostType>
}

type DialogPageType = {
	dialogsData: Array<DialogType>
	messagesData: Array<MessageType>
}

type SidebarType = {}

export type RootStateType = {
	profilePage: ProfilePageType
	dialogsPage: DialogPageType
	sidebar: SidebarType
}

export type MainState = {
	state: RootStateType
	addPost: (postMessage: string) => void
}


let state: RootStateType = {

	profilePage: {
		postsData: [
			{id: 1, message: "Hi, how are you", likes: 15},
			{id: 2, message: "My first post?", likes: 20},
		]
	},

	dialogsPage: {
		dialogsData: [
			{id: 1, name: "Michael"},
			{id: 2, name: "Andrey"},
			{id: 3, name: "Leon"},
			{id: 4, name: "Valera"},
			{id: 5, name: "Sasha"}
		],

		messagesData: [
			{id: 1, message: "Hi"},
			{id: 2, message: "How are you?"},
			{id: 3, message: "Hello"}
		]
	},
	sidebar: {/*Сделать из 29*/}
}

export const addPost = (postMessage: string) => {
	let newPost = {id: new Date().getTime(), message: postMessage, likes: 0}
	state.profilePage.postsData.push(newPost)
	renderEntireTree(state)
}


export default state;

