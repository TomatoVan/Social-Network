type setUserDataType = ReturnType<typeof setUserData>

export type GeneralType = setUserDataType

export const setUserData = (data: any) => ({type: 'SET-USER-DATA', payload: {data}} as const)


export type usersType = {}

let initialState = {
	userId: null,
	email: null,
	login: null,
	isFetching: true
}

export const authReducer = (state = initialState, action: GeneralType) => {
	switch (action.type) {
		case "SET-USER-DATA":
			return {
				...state,
				...action.payload.data
			}
		default:
			return state
	}
}