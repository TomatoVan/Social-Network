import {AppThunk} from '../../app/store';
import {usersAPI, UserType} from '../../api/usersAPI';

//types

type followType = ReturnType<typeof setFollowing>
type setUsersType = ReturnType<typeof setUsers>
type setCurrentPageType = ReturnType<typeof setCurrentPage>
type setTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type setFetchingType = ReturnType<typeof setFetching>
type setInProgressType = ReturnType<typeof setInProgress>

export type UsersActionsType = followType | setUsersType | setCurrentPageType | setTotalUsersCountType | setFetchingType | setInProgressType

export type userType = {
	followed: boolean
	id: number
	name: string
	photos: {
		small: string
		large: string
	}
	status: string
	uniqueUrlName: string
}

export type usersType = {
	users: Array<userType>
	pageSize: number,
	totalUsersCount: number,
	currentPage: number,
	isFetching: boolean,
	inProgress: Array<number>
}

// initial state
let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	inProgress: []
}

//reducer
export const usersReducer = (state: usersType = initialState, action: UsersActionsType) => {

	switch (action.type) {
		case 'CHANGE-FOLLOWING': {
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
		case 'TOGGLE-IN-PROGRESS': {
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

//AC
export const setFollowing = (userId: number) => ({type: 'CHANGE-FOLLOWING', payload: {userId}} as const)
export const setUsers = (users: UserType[]) => ({type: 'SET-USERS', payload: {users}} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', payload: {currentPage}} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: 'SET-TOTAL-USER-COUNT', payload: {totalCount}} as const)
export const setFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', payload: {isFetching}} as const)
export const setInProgress = (isFetching: boolean, userId: number) => ({type: 'TOGGLE-IN-PROGRESS', payload: {isFetching, userId}} as const)

//TC
export const getUsersOnMount = (currentPage: number, pageSize: number): AppThunk => (dispatch) => {
	dispatch(setFetching(true))
	usersAPI.getUsers(currentPage, pageSize).then(data => {
		dispatch(setFetching(false))
		dispatch(setUsers(data.items))
		dispatch(setTotalUsersCount(data.totalCount))
	})

}

export const getUsersOnChange = (currentPage: number, pageSize: number): AppThunk => (dispatch) => {
	dispatch(setFetching(true))
	dispatch(setCurrentPage(currentPage))
	usersAPI.getUsers(currentPage, pageSize).then(data => {
		dispatch(setFetching(false))
		dispatch(setUsers(data.items))
	})

}

export const follow = (userId: number): AppThunk => (dispatch) => {
	dispatch(setInProgress(true, userId))
	usersAPI.setUnfollow(userId).then(data => {
		if (data.resultCode === 0) {
			dispatch(setFollowing(userId))
		}
		dispatch(setInProgress(false, userId))
	})

}

export const unFollow = (userId: number): AppThunk => (dispatch) => {
	dispatch(setInProgress(true, userId))
	usersAPI.setFollow(userId).then(data => {
		if (data.resultCode === 0) {
			dispatch(setFollowing(userId))
		}
		dispatch(setInProgress(false, userId))
	})
}

