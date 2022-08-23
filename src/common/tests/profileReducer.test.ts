import {profileReducer, profileStateType, setUserProfile, setUserStatus} from '../../features/profile/profileReducer';


let startState: profileStateType

beforeEach(() =>
	startState = {
		postsData: [
			{id: 1, message: 'Hi, how are you', likes: 15},
			{id: 2, message: 'My first post?', likes: 20},
		],
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

	const endState = profileReducer(startState, setUserProfile(newUser))
	expect(endState.profile).toBe(newUser)
})
test('UPDATE STATUS', () => {
	const newStatus = 'NEW STATUS!'
	const endState = profileReducer(startState, setUserStatus(newStatus))
	expect(endState.status).toBe(newStatus)
})
