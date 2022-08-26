import {AppThunkType} from '../../app/store';
import {profileAPI} from '../../api/profileAPI';
import {changeAppStatus, setError} from '../../app/appReducer';


// initial state
let initialState = {
	postsData: [],
	profile: null,
	status: ''
}

//reducer
export const meProfileReducer = (state: MeProfileStateType = initialState, action: MeProfileActionsType): MeProfileStateType => {

	switch (action.type) {
		case 'ME/ADD-POST':
			return {
				...state,
				postsData: [...state.postsData, {id: new Date().getTime(), message: action.payload.newPost, likes: 0, comments: 0, shares: 0}]
			}
		case 'ME/SET-USER-PROFILE':
			return {
				...state, profile: action.payload.profile

			}
		case 'ME/SET-USER-STATUS':
			return {
				...state, status: action.payload.status
			}
		case 'ME/SAVE-PHOTOS-SUCCESS': {
			if (state.profile) {
				return {
					...state, profile: {...state.profile, photos: action.payload.photos}
				}
			}
			return state
		}
		default:
			return state
	}
}

//AC
export const addMyPost = (newPost: string) => ({type: 'ME/ADD-POST', payload: {newPost}} as const)
export const setMyProfile = (profile: ProfileType) => ({type: 'ME/SET-USER-PROFILE', payload: {profile}} as const)
export const setMyStatus = (status: string) => ({type: 'ME/SET-USER-STATUS', payload: {status}} as const)
export const saveMyPhotoSuccess = (photos: PhotosType) => ({type: 'ME/SAVE-PHOTOS-SUCCESS', payload: {photos}} as const)

//TC
export const getMyProfile = (userId: string): AppThunkType => async (dispatch) => {
	dispatch(changeAppStatus('loading'));
	try {
		const response = await profileAPI.getUserProfile(userId)
		dispatch(setMyProfile(response.data))
	} catch (err: any) {
		dispatch(setError(err));
	} finally {
		dispatch(changeAppStatus('idle'));
	}
}


export const getMyStatus = (userId: string): AppThunkType => async (dispatch) => {
	dispatch(changeAppStatus('loading'));
	try {
		const response = await profileAPI.getUserStatus(userId)
		dispatch(setMyStatus(response.data))
	} catch (err: any) {
		dispatch(setError(err));
	} finally {
		dispatch(changeAppStatus('idle'));
	}
}


export const updateMyStatus = (status: string): AppThunkType => async (dispatch) => {
	dispatch(changeAppStatus('loading'));
	try {
		const response = await profileAPI.updateUserStatus(status)
		if (response.data.resultCode === 0) {
			dispatch(setMyStatus(status))
		}
	} catch (err: any) {
		dispatch(setError(err));
	} finally {
		dispatch(changeAppStatus('idle'));
	}
}

export const updateMyProfile = (userId: string, profileData: ProfileType): AppThunkType => async (dispatch) => {
	dispatch(changeAppStatus('loading'));
	try {
		const response = await profileAPI.updateUserProfile(profileData)
		if (response.data.resultCode === 0) {
			dispatch(getMyProfile(userId))
		}
	} catch (err: any) {
		dispatch(setError(err));
	} finally {
		dispatch(changeAppStatus('idle'));
	}
}

export const saveMyPhoto = (file: File): AppThunkType => async (dispatch) => {
	dispatch(changeAppStatus('loading'));
	try {
		const response = await profileAPI.getPhotos(file)
		if (response.data.resultCode === 0) {
			dispatch(saveMyPhotoSuccess(response.data.data.photos))
		}
	} catch (err: any) {
		dispatch(setError(err));
	} finally {
		dispatch(changeAppStatus('idle'));
	}
}


//types
type AddPostType = ReturnType<typeof addMyPost>
type SetUserProfileType = ReturnType<typeof setMyProfile>
type SetUserStatusType = ReturnType<typeof setMyStatus>
type savePhotoSuccessType = ReturnType<typeof saveMyPhotoSuccess>

export type MeProfileActionsType = AddPostType | SetUserProfileType | SetUserStatusType | savePhotoSuccessType

type ContactsType = {
	github: string | null,
	vk: string | null,
	facebook: string | null,
	instagram: string | null,
	twitter: string | null,
	website: string | null,
	youtube: string | null,
	mainLink: string | null,
}

type PhotosType = {
	small: string | null,
	large: string | null
}

export type ProfileType = {
	aboutMe: string
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: ContactsType
	photos: PhotosType
}

type PostDataType = {
	id: number,
	message: string,
	likes: number
	shares: number
	comments: number
}

export type MeProfileStateType = {
	postsData: PostDataType[]
	profile: ProfileType | null
	status: string
}


