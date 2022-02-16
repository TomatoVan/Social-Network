import {dialogsType, sendMessage, updateNewMessageBody} from "../../redux/dialogsReducer";
import Dialogs from "../Dialogs/Dialogs";
import {connect} from "react-redux";
import {GeneralType} from "../../redux/dialogsReducer";

let mapStateToProps = (state: { dialogsPage: dialogsType }) => {
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
