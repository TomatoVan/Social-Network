import {dialogsReducer, DialogsStateType, sendMessage} from '../../features/dialogs/dialogsReducer';


let startState: DialogsStateType

beforeEach(() =>
	startState = {
		dialogsData: [
			{id: 1, name: 'Michael'},
			{id: 2, name: 'Andrey'},
			{id: 3, name: 'Leon'},
			{id: 4, name: 'Valera'},
			{id: 5, name: 'Sasha'}
		],

		messagesData: [
			{id: 1, message: 'Hi'},
			{id: 2, message: 'How are you?'},
			{id: 3, message: 'Hello'}
		],
	}
)

test('MESSAGE SENT', () => {

	let message = 'Hello there'

	const endState = dialogsReducer(startState, sendMessage(message))
	expect(endState.messagesData[3].message).toBe(message)

});
