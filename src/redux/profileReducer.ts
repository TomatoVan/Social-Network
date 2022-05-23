import {Dispatch} from "redux";
import {profileAPI} from "../api/Api";

type addPostType = ReturnType<typeof addPost>
type changeNewTextType = ReturnType<typeof changeNewText>
type setUserProfileType = ReturnType<typeof setUserProfile>
type setUserStatusType = ReturnType<typeof setUserStatus>

export type GeneralTypes = addPostType | changeNewTextType | setUserProfileType | setUserStatusType

export const addPost = () => ({type: 'ADD-POST'} as const)
export const changeNewText = (newText: string) => ({type: 'CHANGE-NEW-TEXT', payload: {newText}} as const)
export const setUserProfile = (profile: any) => ({type: 'SET-USER-PROFILE', payload: {profile}} as const)
export const setUserStatus = (status: string) => ({type: 'SET-USER-STATUS', payload: {status}} as const)

export const getUserProfileOnMount = (userId: string) => {
	return (dispatch: Dispatch) => {
		profileAPI.getUserProfile(userId).then(data => {
			dispatch(setUserProfile(data))
		})
	}
}

export const getUserStatusOnMount = (userId: string) => {
	return (dispatch: Dispatch) => {
		profileAPI.getUserStatus(userId).then(data => {
			dispatch(setUserStatus(data))
		})
	}
}

export const updateUserStatus = (status: string) => {
	return (dispatch: Dispatch) => {
		profileAPI.updateUserStatus(status).then(data => {
			if (data.resultCode === 0) {
				dispatch(setUserStatus(status))
			}
		})
	}
}

export type profileType = {
	postsData: { id: number, message: string, likes: number }[]
	newPostText: string,
	profile: null,
	status: string
}

let initialState = {
	postsData: [
		{id: 1, message: "Hi, how are you", likes: 15},
		{id: 2, message: "My first post?", likes: 20},
	],
	newPostText: '',
	profile: null,
	status: ""
}

export const profileReducer = (state: profileType = initialState, action: GeneralTypes) => {

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
				newPostText: action.payload.newText
			}
		case "SET-USER-PROFILE":
			return {
				...state, profile: action.payload.profile

			}
		case "SET-USER-STATUS":
			return {
				...state, status: action.payload.status
			}
		default:
			return state
	}
}