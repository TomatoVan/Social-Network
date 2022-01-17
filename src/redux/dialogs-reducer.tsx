import {ActionTypes, DialogPageType} from "./state";


export const updateNewMessageBody = (body: string) => ({type: 'UPDATE-NEW-MESSAGE-BODY', body: body} as const)
export const sendMessage = () => ({type: 'SEND-MESSAGE'} as const)

export const dialogsReducer = (state: DialogPageType, action: ActionTypes) => {

	switch (action.type) {
		case "UPDATE-NEW-MESSAGE-BODY":
			state.newMessageBody = action.body
			return state
		case "SEND-MESSAGE":
			let body = state.newMessageBody
			state.newMessageBody = ''
			state.messagesData.push({id: 6, message: body})
			return state
		default:
			return state
	}
}