import {AppThunk} from '../../app/store';
import {usersAPI, UserType} from '../../api/usersAPI';

//types

type FollowType = ReturnType<typeof setFollowing>
type SetUsersType = ReturnType<typeof setUsers>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type SetFetchingType = ReturnType<typeof setFetching>
type SetInProgressType = ReturnType<typeof setInProgress>

export type UsersActionsType = FollowType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType | SetFetchingType | SetInProgressType


export type usersStateType = {
	users: Array<UserType>
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
export const usersReducer = (state: usersStateType = initialState, action: UsersActionsType) => {

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
export const getUsers = (currentPage: number, pageSize: number): AppThunk => (dispatch) => {
	dispatch(setFetching(true))
	usersAPI.getUsers(currentPage, pageSize).then(data => {
		dispatch(setUsers(data.items))
		dispatch(setCurrentPage(currentPage))
		dispatch(setTotalUsersCount(data.totalCount))
		dispatch(setFetching(false))

	})

}

export const setFollow = (userId: number): AppThunk => (dispatch) => {
	dispatch(setInProgress(true, userId))
	usersAPI.setUnfollow(userId).then(data => {
		if (data.resultCode === 0) {
			dispatch(setFollowing(userId))
		}
		dispatch(setInProgress(false, userId))
	})

}

export const setUnFollow = (userId: number): AppThunk => (dispatch) => {
	dispatch(setInProgress(true, userId))
	usersAPI.setFollow(userId).then(data => {
		if (data.resultCode === 0) {
			dispatch(setFollowing(userId))
		}
		dispatch(setInProgress(false, userId))
	})
}

