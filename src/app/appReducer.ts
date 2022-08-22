//types
type initializedSuccessType = ReturnType<typeof initializedSuccess>
type changeAppStatusType = ReturnType<typeof changeAppStatus>

export type AppActionsTypes = initializedSuccessType | changeAppStatusType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type stateType = {
	initialized: boolean
	status: RequestStatusType
}

// initial state
let initialState = {
	initialized: false,
	status: '' as RequestStatusType,
}

//reducer
export const appReducer = (state: stateType = initialState, action: AppActionsTypes): stateType => {
	switch (action.type) {
		case 'INITIALIZED-SUCCESS':
			return {...state, initialized: true}
		case 'CHANGE-APP-STATUS':
			return {...state, status: action.status};
		default:
			return state
	}
}

//AC
export const initializedSuccess = () => ({type: 'INITIALIZED-SUCCESS'} as const)
export const changeAppStatus = (status: RequestStatusType) => ({type: 'CHANGE-APP-STATUS', status} as const)


