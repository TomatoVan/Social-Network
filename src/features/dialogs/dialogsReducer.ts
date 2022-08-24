//types
import {v1} from 'uuid';

type SendMessageType = ReturnType<typeof sendMessage>

export type DialogActionsType = SendMessageType

export type DialogMessageDataElementType = {
	id: number,
	message: string
}

export type DialogDialogsDataElementType = {
	id: number,
	name: string,
	message: string
}

export type MessageDataType = {
	left: Array<DialogMessageDataElementType>,
	right: Array<DialogMessageDataElementType>
}

export type DialogsStateType = {
	dialogsData: Array<DialogDialogsDataElementType>
	messagesData: MessageDataType
}

// initial state
let initialState = {
	dialogsData: [
		{id: 1, name: 'Elina Malina', message: 'What? What you doing?!'},
		{id: 2, name: 'Andrey', message: 'What? What you doing?!'},
		{id: 3, name: 'Leon', message: 'What? What you doing?!'},
		{id: 4, name: 'Valera', message: 'What? What you doing?!'},
		{id: 5, name: 'Sasha', message: 'What? What you doing?!'}
	],

	messagesData: {
		left: [
			{id: 1, message: 'What? What you doing?! Lorem ipsum dolor septum sanctum! Error 404 not found!'},
			{id: 2, message: 'What? What you doing?! Lorem ipsum dolor septum sanctum! Error 404 not found!'},
		],
		right: [
			{id: 1, message: 'Hi'},
			{id: 2, message: 'How are you?'},
		]
	},
}

//reducer
export const dialogsReducer = (state: DialogsStateType = initialState, action: DialogActionsType) => {
	switch (action.type) {
		case 'SEND-MESSAGE':
			return {
				...state,
				messagesData: {
					...state.messagesData, right: [...state.messagesData.right, {id: v1(), message: action.payload.newPost}]
				}
			}
		default:
			return state
	}
}

//AC
export const sendMessage = (newPost: string) => ({type: 'SEND-MESSAGE', payload: {newPost}} as const)