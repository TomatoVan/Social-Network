type addPostType = ReturnType<typeof addPost>
type changeNewTextType = ReturnType<typeof changeNewText>
type setUserProfileType = ReturnType<typeof setUserProfile>

export type GeneralTypes = addPostType | changeNewTextType | setUserProfileType

export const addPost = () => ({type: 'ADD-POST'} as const)
export const changeNewText = (newText: string) => ({type: 'CHANGE-NEW-TEXT', payload: {newText}} as const)
export const setUserProfile = (profile: any) => ({type: 'SET-USER-PROFILE', payload: {profile}} as const)

export type profileType = {
	postsData: { id: number, message: string, likes: number }[]
	newPostText: string,
	profile: null
}

let initialState = {
	postsData: [
		{id: 1, message: "Hi, how are you", likes: 15},
		{id: 2, message: "My first post?", likes: 20},
	],
	newPostText: '',
	profile: null
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
		default:
			return state
	}
}