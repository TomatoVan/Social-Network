import {setCurrentPage, setFetching, setFollowing, setTotalUsersCount, setUsers, usersReducer, UsersStateType} from '../../features/users/usersReducer';


let startState: UsersStateType

beforeEach(() =>
	startState = {
		users: [{
			name: 'Dmitrena',
			id: 22348,
			uniqueUrlName: null,
			photos: {
				small: null,
				large: null,
			},
			status: null,
			followed: false,
		},
			{
				name: 'kanpo',
				id: 22347,
				uniqueUrlName: null,
				photos: {
					small: null,
					large: null,
				},
				status: null,
				followed: true,
			},],
		pageSize: 5,
		totalUsersCount: 0,
		currentPage: 1,
		isFetching: true,
		inProgress: []
	}
)

test('SET USERS', () => {
	const endState = usersReducer(startState, setUsers(startState.users))
	expect(endState.users.length).toBe(2)
})
test('FOLLOW USER', () => {
	const endState = usersReducer(startState, setFollowing(startState.users[0].id))
	expect(endState.users[0].followed).toBe(true)
})
test('UNFOLLOW USER', () => {
	const endState = usersReducer(startState, setFollowing(startState.users[1].id))
	expect(endState.users[1].followed).toBe(false)
})
test('SET CURRENT PAGE', () => {
	const currentPage = 2
	const endState = usersReducer(startState, setCurrentPage(currentPage))
	expect(endState.currentPage).toBe(currentPage)
})
test('SET TOTAL USER COUNT', () => {
	const totalCount = 35
	const endState = usersReducer(startState, setTotalUsersCount(totalCount))
	expect(endState.totalUsersCount).toBe(totalCount)
})
test('TOGGLE IS FETCHING', () => {
	const endState = usersReducer(startState, setFetching(false))
	expect(endState.isFetching).toBe(false)
})
