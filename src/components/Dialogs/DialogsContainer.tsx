import React from 'react';
import {ActionTypes} from "../../redux/state";
import {sendMessage, updateNewMessageBody} from "../../redux/dialogs-reducer";
import Dialogs from "../Dialogs/Dialogs";
import {connect} from "react-redux";

/*type DialogType = {
	id: number
	name: string
}

type MessageType = {
	id: number
	message: string
}

type DialogPageType = {
	dialogsData: Array<DialogType>
	messagesData: Array<MessageType>
	newMessageBody: string
}

type DialogsPageType = {
	dialogsPage: DialogPageType
	dispatch: (action: ActionTypes) => void
}*/

let mapStateToProps = (state: { dialogsPage: any }) => {
	return {
		dialogsPage: state.dialogsPage
	}
}

let mapDispatchToProps = (dispatch: (action: ActionTypes) => void) => {
	return {
		sendMessage: () => {
			dispatch(sendMessage())
		},
		updateNewMessageBody: (event: string) => {
			dispatch(updateNewMessageBody(event))
		}
	}
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;
