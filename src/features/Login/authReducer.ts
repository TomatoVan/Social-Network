import {Dispatch} from 'redux';
import {AppThunk} from '../../app/store';
import {authAPI} from '../../api/authAPI';

//types
type setAuthUserDataType = ReturnType<typeof setAuthUserData>

export type AuthUserActionsType = setAuthUserDataType

export type loginDataType = {
	email: string,
	password: string,
	rememberMe: boolean,
};

type stateType = {
	id: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean
}
// initial state
let initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
}
//reducer
export const authReducer = (state: stateType = initialState, action: AuthUserActionsType) => {
	switch (action.type) {
		case 'SET-USER-DATA':
			return {
				...state,
				...action.payload
			}
		default:
			return state
	}
}


//AC
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
	type: 'SET-USER-DATA',
	payload: {id, email, login, isAuth}
} as const)

//TC
export const getAuthUserData = (): AppThunk => (dispatch) => {
	return authAPI.getUserAuthData()
		.then(data => {
			if (data.resultCode === 0) {
				let {id, email, login} = data.data
				let isAuth = true
				dispatch(setAuthUserData(id, email, login, isAuth))

			}
		})
}


export const login = (loginData: loginDataType, setError: any): AppThunk => (dispatch) => {
	const {email, password, rememberMe} = loginData
	authAPI.login(email, password, rememberMe)
		.then(data => {
			const {fieldsErrors, resultCode, messages} = data
			const setFieldsError = () => {
				if (fieldsErrors.length > 0) {
					for (let key in fieldsErrors) {
						let message = fieldsErrors[key].error
						setError(fieldsErrors[key].field, {type: 'server', message})
					}
				} else for (let key in messages) {
					let message = messages[key]
					setError('password', {type: 'server', message})
				}
			}
			switch (resultCode) {
				case 0:
					// @ts-ignore
					dispatch(getAuthUserData())
					break
				case 1:
					setFieldsError()
					break
				case 10: /*!need add  CAPTCHA*/
					/*authAPI.getCaptcha()*/
					setError('password', {type: 'server', message: 'Incorrect anti-bot symbols'})
					break
				default:
					throw Error('Error Auth')
			}
		})
}


export const logout = (): AppThunk => (dispatch: Dispatch) => {
	authAPI.logout()
		.then(data => {
			if (data.resultCode === 0) {
				dispatch(setAuthUserData(null, null, null, false))
			}
		})
}






