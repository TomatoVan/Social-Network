import {addPostAC, changeNewTextAC, profileReducer} from "./profile-reducer";
import {dialogsReducer, sendMessage, updateNewMessageBody} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";

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
	newMessageBody: string
}

export type SidebarType = {}

export type RootStateType = {
	profilePage: ProfilePageType
	dialogsPage: DialogPageType
	sidebar: SidebarType
}

export type MainState = {
	state: RootStateType
	dispatch: (action: ActionTypes) => void
}

export type StoreType = {
	_state: RootStateType
	_onChange: () => void
	subscribe: (observer: () => void) => void
	getState: () => RootStateType
	dispatch: (action: ActionTypes) => void
}

export type ActionTypes = ReturnType<typeof addPostAC> | ReturnType<typeof changeNewTextAC> | ReturnType<typeof updateNewMessageBody> | ReturnType<typeof sendMessage>

const store: StoreType = {
	_state: {

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
			],
			newMessageBody: ''
		},
		sidebar: {/*Сделать из 29*/}
	},
	_onChange() {
		console.log('123')
	},
	subscribe(observer: () => void) {
		this._onChange = observer;
	},
	getState() {
		return this._state
	},

	dispatch(action) {

		this._state.profilePage = profileReducer(this._state.profilePage, action)
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
		this._state.sidebar = sidebarReducer(this._state.sidebar, action)

		this._onChange()
	}

}

export default store;

