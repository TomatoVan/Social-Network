import {profileAPI} from "../api/Api";
import {AppThunk} from "./reduxStore";

//types
type addPostType = ReturnType<typeof addPost>
type setUserProfileType = ReturnType<typeof setUserProfile>
type setUserStatusType = ReturnType<typeof setUserStatus>

export type ProfileActionsType = addPostType | setUserProfileType | setUserStatusType

export type profileType = {
	postsData: { id: number, message: string, likes: number }[]
	profile: null
	status: string
}

// initial state
let initialState = {
	postsData: [
		{id: 1, message: "Hi, how are you", likes: 15},
		{id: 2, message: "My first post?", likes: 20},
	],
	profile: null,
	status: ''
}

//reducer
export const profileReducer = (state: profileType = initialState, action: ProfileActionsType) => {

	switch (action.type) {
		case "ADD-POST":
			return {
				...state,
				postsData: [...state.postsData, {id: new Date().getTime(), message: action.payload.newPost, likes: 0}]
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

//AC
export const addPost = (newPost: string) => ({type: 'ADD-POST', payload: {newPost}} as const)
export const setUserProfile = (profile: any) => ({type: 'SET-USER-PROFILE', payload: {profile}} as const)
export const setUserStatus = (status: string) => ({type: 'SET-USER-STATUS', payload: {status}} as const)

//TC
export const getUserProfileOnMount = (userId: string): AppThunk => (dispatch) => {
	profileAPI.getUserProfile(userId).then(data => {
		dispatch(setUserProfile(data))
	})
}


export const getUserStatusOnMount = (userId: string): AppThunk => (dispatch) => {
	profileAPI.getUserStatus(userId).then(data => {
		dispatch(setUserStatus(data))
	})
}


export const updateUserStatus = (status: string): AppThunk => (dispatch) => {
	profileAPI.updateUserStatus(status).then(data => {
		if (data.resultCode === 0) {
			dispatch(setUserStatus(status))
		}
	})
}
