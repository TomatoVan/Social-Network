import {appReducer, initializedSuccess, RequestStatusType} from '../../app/appReducer';

type stateType = {
	initialized: boolean
	status: RequestStatusType
	error: string | null

}
let startState: stateType

beforeEach(() => {
	startState = {
		initialized: false,
		status: '' as RequestStatusType,
		error: null

	}
})

test('APP SHOULD BE INITIALIZED', () => {

	const endState = appReducer(startState, initializedSuccess())
	expect(endState.initialized).toBe(true);
});
