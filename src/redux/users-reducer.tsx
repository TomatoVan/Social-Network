type followACType = ReturnType<typeof followAC>
type setUsersACType = ReturnType<typeof setUsersAC>
type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>
export type GeneralType = followACType | setUsersACType | setCurrentPageACType | setTotalUsersCountACType

export const followAC = (userId: number) => ({type: 'CHANGE-FOLLOWING', payload: {userId}} as const)
export const setUsersAC = (users: any) => ({type: 'SET-USERS', payload: {users}} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', payload: {currentPage}} as const)
export const setTotalUsersCountAC = (totalCount: number) => ({type: 'SET-TOTAL-USER-COUNT', payload: {totalCount}} as const)

let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1
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
			return {...state, users: action.payload.users}
		}
		case 'SET-CURRENT-PAGE': {
			return {...state, currentPage: action.payload.currentPage}
		}
		case 'SET-TOTAL-USER-COUNT': {
			return {...state, totalUsersCount: action.payload.totalCount}
		}
		default:
			return state
	}
}