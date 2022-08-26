import {AppThunkType} from '../../app/store';
import {authAPI} from '../../api/authAPI';
import {changeAppStatus, initializedSuccess, setError} from '../../app/appReducer';

//types
type SetAuthUserDataType = ReturnType<typeof setAuthUserData>

export type AuthUserActionsType = SetAuthUserDataType

export type LoginDataType = {
	email: string,
	password: string,
	rememberMe: boolean,
};

type LoginStateType = {
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
export const authReducer = (state: LoginStateType = initialState, action: AuthUserActionsType): LoginStateType => {
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
export const getAuthUserData = (): AppThunkType => async (dispatch) => {
	dispatch(changeAppStatus('loading'));
	try {
		const response = await authAPI.getUserAuthData()
		if (response.data.resultCode === 0) {
			let {id, email, login} = response.data.data
			let isAuth = true
			dispatch(initializedSuccess())
			dispatch(setAuthUserData(id, email, login, isAuth))
		}
	} catch (err: any) {
		dispatch(setError(err));
	} finally {
		dispatch(changeAppStatus('idle'));
	}

}


export const login = (loginData: LoginDataType, Error: any): AppThunkType => async (dispatch) => {
	const {email, password, rememberMe} = loginData
	dispatch(changeAppStatus('loading'));
	try {
		const response = await authAPI.login(email, password, rememberMe)
		const {fieldsErrors, resultCode, messages} = response.data
		const setFieldsError = () => {
			if (fieldsErrors.length > 0) {
				for (let key in fieldsErrors) {
					let message = fieldsErrors[key].error
					Error(fieldsErrors[key].field, {type: 'server', message})
				}
			} else for (let key in messages) {
				let message = messages[key]
				Error('password', {type: 'server', message})
			}
		}
		switch (resultCode) {
			case 0:
				dispatch(getAuthUserData())
				break
			case 1:
				setFieldsError()
				break
			case 10:
				Error('password', {type: 'server', message: 'Incorrect anti-bot symbols'})
				break
			default:
				throw new Error('Error Auth')
		}

	} catch (err: any) {
		dispatch(setError(err));
	} finally {
		dispatch(changeAppStatus('idle'));
	}
}


export const logout = (): AppThunkType => async (dispatch) => {
	dispatch(changeAppStatus('loading'));
	try {
		const response = await authAPI.logout()
		if (response.data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false))
		}
	} catch (err: any) {
		dispatch(setError(err));
	} finally {
		dispatch(changeAppStatus('idle'));
	}
}






