type setAuthUserDataType = ReturnType<typeof setAuthUserData>

export type GeneralType = setAuthUserDataType

export const setAuthUserData = (id: number, email: string, login: string) => ({type: 'SET-USER-DATA', payload: {id, email, login}} as const)


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