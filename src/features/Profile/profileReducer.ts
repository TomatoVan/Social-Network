import {AppThunk} from '../../app/store';
import {profileAPI} from '../../api/profileAPI';


//types
type AddPostType = ReturnType<typeof addPost>
type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetUserStatusType = ReturnType<typeof setUserStatus>
type savePhotoSuccessType = ReturnType<typeof savePhotoSuccess>

export type ProfileActionsType = AddPostType | SetUserProfileType | SetUserStatusType | savePhotoSuccessType

export type profileStateType = {
	postsData: { id: number, message: string, likes: number }[]
	profile: any
	status: string
}

// initial state
let initialState = {
	postsData: [
		{id: 1, message: 'Hi, how are you', likes: 15},
		{id: 2, message: 'My first post?', likes: 20},
	],
	profile: null,
	status: ''
}

//reducer
export const profileReducer = (state: profileStateType = initialState, action: ProfileActionsType) => {

	switch (action.type) {
		case 'ADD-POST':
			return {
				...state,
				postsData: [...state.postsData, {id: new Date().getTime(), message: action.payload.newPost, likes: 0}]
			}
		case 'SET-USER-PROFILE':
			return {
				...state, profile: action.payload.profile

			}
		case 'SET-USER-STATUS':
			return {
				...state, status: action.payload.status
			}
		case 'SAVE-PHOTOS-SUCCESS': {
			return {
				...state, profile: {...state.profile, photos: action.payload.photos}
			}
		}
		default:
			return state
	}
}

//AC
export const addPost = (newPost: string) => ({type: 'ADD-POST', payload: {newPost}} as const)
export const setUserProfile = (profile: any) => ({type: 'SET-USER-PROFILE', payload: {profile}} as const)
export const setUserStatus = (status: string) => ({type: 'SET-USER-STATUS', payload: {status}} as const)
export const savePhotoSuccess = (photos: any) => ({type: 'SAVE-PHOTOS-SUCCESS', payload: {photos}} as const)

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

export const savePhoto = (file: any): AppThunk => (dispatch) => {
	profileAPI.getPhotos(file)
		.then(data => {
			if (data.resultCode === 0) {
				dispatch(savePhotoSuccess(data.data.photos))
			}
		})
}
