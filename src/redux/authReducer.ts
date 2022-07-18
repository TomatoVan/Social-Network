import {Dispatch} from "redux";
import {authAPI} from "../api/Api";

type setAuthUserDataType = ReturnType<typeof setAuthUserData>

export type GeneralType = setAuthUserDataType

export type loginDataType = {
	email: string,
	password: string,
	rememberMe: boolean,
};

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
	type: 'SET-USER-DATA',
	payload: {id, email, login, isAuth}
} as const)

export const getUserAuthDataOnMount = () => {
	return (dispatch: Dispatch) => {
		authAPI.getUserAuthData()
			.then(data => {
				if (data.resultCode === 0) {
					let {id, email, login} = data.data
					let isAuth = true
					dispatch(setAuthUserData(id, email, login, isAuth))

				}
			})
	}
}

export const login = (loginData: loginDataType) => {
	return (dispatch: Dispatch) => {
		const {email, password, rememberMe} = loginData
		authAPI.login(email, password, rememberMe)
			.then(data => {
				if (data.resultCode === 0) {
					console.log(data.data)
					// @ts-ignore
					dispatch(getUserAuthDataOnMount())
				}
			})
	}
}

export const logout = () => {
	return (dispatch: Dispatch) => {
		authAPI.logout()
			.then(data => {
				if (data.resultCode === 0) {
					dispatch(setAuthUserData(null, null, null, false))
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

type stateType = {
	id: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean
}

export const authReducer = (state: stateType = initialState, action: GeneralType) => {
	switch (action.type) {
		case "SET-USER-DATA":
			return {
				...state,
				...action.payload
			}
		default:
			return state
	}
}