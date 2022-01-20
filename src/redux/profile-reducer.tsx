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
			const newPost: PostType = {id: new Date().getTime(), message: state.newPostText, likes: 0}
			state.postsData.push(newPost)
			state.newPostText = ''
			return state
		case "CHANGE-NEW-TEXT":
			state.newPostText = action.newText
			return state
		default:
			return state
	}
}