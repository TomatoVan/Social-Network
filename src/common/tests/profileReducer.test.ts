import {userProfileReducer, UserProfileStateType, setUserProfile, setUserStatus} from '../../features/userProfile/userProfileReducer';


let startState: UserProfileStateType

beforeEach(() =>
	startState = {
		profile: null,
		status: ''
	}
)

test('SET USER PROFILE', () => {
	const newUser = {
		aboutMe: 'я крутой чувак 1001%',
		contacts: {
			facebook: null,
			website: null,
			vk: null,
			twitter: null,
			instagram: null,
			youtube: null,
			github: null,
			mainLink: null,
		},
		lookingForAJob: true,
		lookingForAJobDescription: 'не ищу, а дурачусь',
		fullName: 'samurai dimych',
		userId: 1,
		photos: {
			small: null,
			large: null,
		}
	}

	const endState = userProfileReducer(startState, setUserProfile(newUser))
	expect(endState.profile).toBe(newUser)
})
test('UPDATE STATUS', () => {
	const newStatus = 'NEW STATUS!'
	const endState = userProfileReducer(startState, setUserStatus(newStatus))
	expect(endState.status).toBe(newStatus)
})
