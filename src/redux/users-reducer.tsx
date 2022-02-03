type followACType = ReturnType<typeof followAC>
type setUsersACType = ReturnType<typeof setUsersAC>
export type GeneralType = followACType | setUsersACType

export const followAC = (userId: number) => ({type: 'CHANGE-FOLLOWING', payload: {userId}} as const)
export const setUsersAC = (users: any) => ({type: 'SET-USERS', payload: {users}} as const)

let initialState = {
	users: []
}

export const usersReducer = (state = initialState, action: GeneralType) => {

	switch (action.type) {
		case "CHANGE-FOLLOWING": {
			return {
				...state,
				users: state.users.map((u: any) => u.id === action.payload.userId ? {...u, followed: !u.followed} : u)
			}
		}
		case 'SET-USERS': {
			return {...state, users: [...state.users, ...action.payload.users]}
		}
		default:
			return state
	}
}