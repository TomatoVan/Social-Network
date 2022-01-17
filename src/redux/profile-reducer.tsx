import {ActionTypes, PostType, ProfilePageType} from "./state";


export const addPostAC = () => ({type: 'ADD-POST'} as const)
export const changeNewTextAC = (text: string) => ({type: 'CHANGE-NEW-TEXT', newText: text} as const)

export const profileReducer = (state: ProfilePageType, action: ActionTypes) => {

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