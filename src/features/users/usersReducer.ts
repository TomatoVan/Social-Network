import {AppThunkType} from '../../app/store';
import {usersAPI, UserType} from '../../api/usersAPI';
import {changeAppStatus, setError} from '../../app/appReducer';

//types

type FollowType = ReturnType<typeof setFollowing>
type SetUsersType = ReturnType<typeof setUsers>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type SetFetchingType = ReturnType<typeof setFetching>
type SetInProgressType = ReturnType<typeof setInProgress>

export type UsersActionsType = FollowType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType | SetFetchingType | SetInProgressType


export type UsersStateType = {
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
	pageSize: 12,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	inProgress: []
}

//reducer
export const usersReducer = (state: UsersStateType = initialState, action: UsersActionsType): UsersStateType => {

	switch (action.type) {
		case 'CHANGE-FOLLOWING': {
			return {
				...state,
				users: state.users.map((u: UserType) => u.id === action.payload.userId ? {...u, followed: !u.followed} : u)
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
export const getUsers = (currentPage: number, pageSize: number): AppThunkType => async (dispatch) => {
	dispatch(changeAppStatus('loading'));
	try {
		const response = await usersAPI.getUsers(currentPage, pageSize)
		dispatch(setUsers(response.data.items))
		dispatch(setCurrentPage(currentPage))
		dispatch(setTotalUsersCount(response.data.totalCount))
	} catch (err: any) {
		dispatch(setError(err));
	} finally {
		dispatch(changeAppStatus('idle'));
	}
}

export const setFollow = (userId: number, isFollow: boolean): AppThunkType => async (dispatch) => {
	try {
		let response
		if (isFollow) response = await usersAPI.setUnfollow(userId)
		else response = await usersAPI.setFollow(userId)

		if (response.data.resultCode === 0) {
			dispatch(setFollowing(userId))
		}
		dispatch(setInProgress(false, userId))
	} catch (err: any) {
		dispatch(setError(err));
	} finally {
		dispatch(changeAppStatus('idle'));
	}
}

