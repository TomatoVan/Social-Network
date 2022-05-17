import {Dispatch} from "redux";
import {usersAPI} from "../api/Api";

type setAuthUserDataType = ReturnType<typeof setAuthUserData>

export type GeneralType = setAuthUserDataType

export const setAuthUserData = (id: number, email: string, login: string) => ({type: 'SET-USER-DATA', payload: {id, email, login}} as const)

export const getUserAuthDataOnMount = () => {
	return (dispatch: Dispatch) => {
		usersAPI.getUserAuthData().then(data => {
			if (data.resultCode === 0) {
				let {id, email, login} = data.data
				dispatch(setAuthUserData(id, email, login))

			}
		})
	}
}


let initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
}

export const authReducer = (state = initialState, action: GeneralType) => {
	switch (action.type) {
		case "SET-USER-DATA":
			return {
				...state,
				...action.payload,
				isAuth: true
			}
		default:
			return state
	}
}