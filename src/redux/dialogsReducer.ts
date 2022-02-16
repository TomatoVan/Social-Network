type updateNewMessageBodyType = ReturnType<typeof updateNewMessageBody>
type sendMessageType = ReturnType<typeof sendMessage>

export type GeneralType = updateNewMessageBodyType | sendMessageType

export const updateNewMessageBody = (body: string) => ({type: 'UPDATE-NEW-MESSAGE-BODY', payload: {body}} as const)
export const sendMessage = () => ({type: 'SEND-MESSAGE'} as const)

export type dialogsType = {
	dialogsData: { id: number, name: string }[]
	messagesData: { id: number, message: string }[]
	newMessageBody: string
}

let initialState = {
	dialogsData: [
		{id: 1, name: "Michael"},
		{id: 2, name: "Andrey"},
		{id: 3, name: "Leon"},
		{id: 4, name: "Valera"},
		{id: 5, name: "Sasha"}
	],

	messagesData: [
		{id: 1, message: "Hi"},
		{id: 2, message: "How are you?"},
		{id: 3, message: "Hello"}
	],
	newMessageBody: ''
}

export const dialogsReducer = (state: dialogsType = initialState, action: GeneralType) => {
	switch (action.type) {
		case "UPDATE-NEW-MESSAGE-BODY":
			return {
				...state,
				newMessageBody: action.payload.body
			}
		case "SEND-MESSAGE":
			let body = state.newMessageBody
			return {
				...state,
				messagesData: [...state.messagesData, {id: new Date().getTime(), message: body}],
				newMessageBody: ''
			}
		default:
			return state
	}
}