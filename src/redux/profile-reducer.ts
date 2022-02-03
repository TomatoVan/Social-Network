import {ActionTypes, PostType, ProfilePageType} from "./state";

export const addPostAC = () => ({type: 'ADD-POST'} as const)
export const changeNewTextAC = (text: string) => ({type: 'CHANGE-NEW-TEXT', newText: text} as const)

let initialState = {
	postsData: [
		{id: 1, message: "Hi, how are you", likes: 15},
		{id: 2, message: "My first post?", likes: 20},
	],
	newPostText: ''
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionTypes) => {

	switch (action.type) {
		case "ADD-POST":
			return {
				...state,
				postsData: [...state.postsData, {id: new Date().getTime(), message: state.newPostText, likes: 0}],
				newPostText: ''
			}
		case "CHANGE-NEW-TEXT":
			return {
				...state,
				newPostText: action.newText
			}
		default:
			return state
	}
}