import {getAuthUserData} from "./authReducer";
import {AppThunk} from "./reduxStore";

//types
type initializedSuccessType = ReturnType<typeof initializedSuccess>

export type AppActionsTypes = initializedSuccessType

type stateType = {
	initialized: boolean
}

// initial state
let initialState = {
	initialized: false,
}

//reducer
export const appReducer = (state: stateType = initialState, action: AppActionsTypes) => {
	switch (action.type) {
		case "INITIALIZED-SUCCESS":
			return {
				...state,
				initialized: true
			}
		default:
			return state
	}
}

//AC
export const initializedSuccess = () => ({type: 'INITIALIZED-SUCCESS'} as const)

//TC
export const initializeApp = (): AppThunk => (dispatch) => {
	// @ts-ignore
	let promise = dispatch(getAuthUserData())
	Promise.all([promise])
		.then(() => {
			dispatch(initializedSuccess())
		})
}
