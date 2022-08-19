import {appReducer, initializedSuccess} from '../../app/appReducer';

type stateType = {
	initialized: boolean
}
let startState: stateType

beforeEach(() => {
	startState = {
		initialized: false,
	}
})

test('APP SHOULD BE INITIALIZED', () => {

	const endState = appReducer(startState, initializedSuccess())
	expect(endState.initialized).toBe(true);
});
