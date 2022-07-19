import React from 'react';
import {sendMessage} from "../../redux/dialogsReducer";
import Dialogs from "../Dialogs/Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppRootStateType} from "../../redux/reduxStore";
import {compose} from "redux";


let mapStateToProps = (state: AppRootStateType): any => {
	return {
		dialogsPage: state.dialogsPage,
	}
}

/*let mapDispatchToProps = (dispatch: (action: GeneralType) => void) => {
	return {
		sendMessage: () => {
			dispatch(sendMessage())
		},
		updateNewMessageBody: (event: string) => {
			dispatch(updateNewMessageBody(event))
		}
	}
}*/

// let AuthRedirectComponent = withAuthRedirect(Dialogs)
//
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default compose<React.ComponentType>(
	connect(mapStateToProps, {sendMessage}),
	withAuthRedirect
)(Dialogs);
