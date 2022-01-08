let onChange = () => {
	console.log('123')
}

export const subscribe = (observer: () => void) => {
	onChange = observer;
}

export type MessageType = {
	id: number
	message: string
}

export type DialogType = {
	id: number
	name: string
}

export type PostType = {
	id: number
	message: string
	likes: number
}

export type ProfilePageType = {
	postsData: Array<PostType>
	newPostText: string
}

export type DialogPageType = {
	dialogsData: Array<DialogType>
	messagesData: Array<MessageType>
}

export type SidebarType = {}

export type RootStateType = {
	profilePage: ProfilePageType
	dialogsPage: DialogPageType
	sidebar: SidebarType
}

export type MainState = {
	state: RootStateType
	addPost: () => void
	changeNewText: (newText: string) => void
}


let state: RootStateType = {

	profilePage: {
		postsData: [
			{id: 1, message: "Hi, how are you", likes: 15},
			{id: 2, message: "My first post?", likes: 20},
		],
		newPostText: ''

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

export const addPost = () => {
	const newPost: PostType = {id: new Date().getTime(), message: state.profilePage.newPostText, likes: 0}
	state.profilePage.postsData.push(newPost)
	state.profilePage.newPostText = ''
	onChange()
}

export const changeNewText = (newText: string) => {
	state.profilePage.newPostText = newText
	onChange()
}


export default state;

