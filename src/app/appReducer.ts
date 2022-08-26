//types
type initializedSuccessType = ReturnType<typeof initializedSuccess>
type changeAppStatusType = ReturnType<typeof changeAppStatus>
type setErrorType = ReturnType<typeof setError>

export type AppActionsTypes = initializedSuccessType | changeAppStatusType | setErrorType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type AppStateType = {
	initialized: boolean
	status: RequestStatusType
	error: string | null
}

// initial state
let initialState = {
	initialized: false,
	status: '' as RequestStatusType,
	error: null,
}

//reducer
export const appReducer = (state: AppStateType = initialState, action: AppActionsTypes): AppStateType => {
	switch (action.type) {
		case 'INITIALIZED-SUCCESS':
			return {...state, initialized: true}
		case 'CHANGE-APP-STATUS':
			return {...state, status: action.status};
		case 'SET-ERROR': {
			return {...state, error: action.error};
		}
		default:
			return state
	}
}

//AC
export const initializedSuccess = () => ({type: 'INITIALIZED-SUCCESS'} as const)
export const changeAppStatus = (status: RequestStatusType) => ({type: 'CHANGE-APP-STATUS', status} as const)
export const setError = (error: string | null) => ({type: 'SET-ERROR', error} as const)



