import {Dispatch} from "redux";
import {getAuthUserData} from "./authReducer";

type initializedSuccessType = ReturnType<typeof initializedSuccess>

export type GeneralType = initializedSuccessType

export const initializedSuccess = () => ({type: 'INITIALIZED-SUCCESS'} as const)

export const initializeApp = () => (dispatch: Dispatch) => {
	// @ts-ignore
	let promise = dispatch(getAuthUserData())
	Promise.all([promise])
		.then(() => {
			dispatch(initializedSuccess())
		})
}

let initialState = {
	initialized: false,
}

type stateType = {
	initialized: boolean
}

export const appReducer = (state: stateType = initialState, action: GeneralType) => {
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