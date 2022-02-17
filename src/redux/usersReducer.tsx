type followType = ReturnType<typeof setFollowing>
type setUsersType = ReturnType<typeof setUsers>
type setCurrentPageType = ReturnType<typeof setCurrentPage>
type setTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type setFetchingType = ReturnType<typeof setFetching>
type setInProgressType = ReturnType<typeof setInProgress>

export type GeneralType = followType | setUsersType | setCurrentPageType | setTotalUsersCountType | setFetchingType | setInProgressType

export const setFollowing = (userId: number) => ({type: 'CHANGE-FOLLOWING', payload: {userId}} as const)
export const setUsers = (users: any) => ({type: 'SET-USERS', payload: {users}} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', payload: {currentPage}} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: 'SET-TOTAL-USER-COUNT', payload: {totalCount}} as const)
export const setFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', payload: {isFetching}} as const)
export const setInProgress = (isFetching: boolean, userId: number) => ({type: 'TOGGLE-IN-PROGRESS', payload: {isFetching, userId}} as const)

export type usersType = {
	users: any
	pageSize: number,
	totalUsersCount: number,
	currentPage: number,
	isFetching: boolean,
	inProgress: Array<number>
}

let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	inProgress: []
}

export const usersReducer = (state: usersType = initialState, action: GeneralType) => {

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
		case 'TOGGLE-IS-FETCHING' : {
			return {...state, isFetching: action.payload.isFetching}
		}
		case "TOGGLE-IN-PROGRESS": {
			return {
				...state,
				inProgress: action.payload.isFetching
					? [...state.inProgress, action.payload.userId]
					: state.inProgress.filter(id => id !== action.payload.userId)
			}
		}
		default:
			return state
	}
}