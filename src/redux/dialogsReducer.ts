type sendMessageType = ReturnType<typeof sendMessage>

export type GeneralType = sendMessageType

export const sendMessage = (newPost: string) => ({type: 'SEND-MESSAGE', payload: {newPost}} as const)

export type dialogsType = {
	dialogsData: { id: number, name: string }[]
	messagesData: { id: number, message: string }[]
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
}

export const dialogsReducer = (state: dialogsType = initialState, action: GeneralType) => {
	switch (action.type) {
		case "SEND-MESSAGE":
			return {
				...state,
				messagesData: [...state.messagesData, {id: new Date().getTime(), message: action.payload.newPost}],
				newMessageBody: ''
			}
		default:
			return state
	}
}