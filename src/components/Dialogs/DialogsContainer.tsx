import React from 'react';
import {sendMessage, updateNewMessageBody} from "../../redux/dialogsReducer";
import Dialogs from "../Dialogs/Dialogs";
import {connect} from "react-redux";
import {GeneralType} from "../../redux/dialogsReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/reduxStore";


let mapStateToProps = (state: AppStateType): any => {
	return {
		dialogsPage: state.dialogsPage,
	}
}

let mapDispatchToProps = (dispatch: (action: GeneralType) => void) => {
	return {
		sendMessage: () => {
			dispatch(sendMessage())
		},
		updateNewMessageBody: (event: string) => {
			dispatch(updateNewMessageBody(event))
		}
	}
}

let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer;
