import {sendMessage, updateNewMessageBody} from "../../redux/dialogs-reducer";
import Dialogs from "../Dialogs/Dialogs";
import {connect} from "react-redux";
import {GeneralType} from "../../redux/dialogs-reducer";

let mapStateToProps = (state: { dialogsPage: any }) => {
	return {
		dialogsPage: state.dialogsPage
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;
