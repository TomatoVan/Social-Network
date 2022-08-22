import {authReducer, setAuthUserData} from '../../features/login/authReducer';

type stateType = {
	id: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean
}
let startState: stateType

beforeEach(() => {
	startState = {
		id: null,
		email: null,
		login: null,
		isAuth: false,
	}
})

test('AUTH', () => {

	let data = {
		id: 123,
		email: 'example@gmail.com',
		login: 'kolobok',
		isAuth: true,
		captcha: null
	}

	const endState = authReducer(startState, setAuthUserData(data.id, data.email, data.login, data.isAuth))
	expect(endState.id).toBe(data.id)
	expect(endState.email).toBe(data.email)
	expect(endState.login).toBe(data.login)
	expect(endState.isAuth).toBe(true)
});
