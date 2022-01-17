import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DiaologItem/DialogItem";
import Message from "./Message/Message";
import {ActionTypes} from "../../redux/state";
import {sendMessage, updateNewMessageBody} from "../../redux/dialogs-reducer";

type DialogType = {
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

type dialogsPageType = {
	dialogsPage: DialogPageType
	dispatch: (action: ActionTypes) => void
}

const Dialogs: React.FC<dialogsPageType> = (props) => {
	let dialogsElements = props.dialogsPage.dialogsData.map((d: any) => <DialogItem id={d.id} name={d.name}/>);
	let messagesElements = props.dialogsPage.messagesData.map((m: any) => <Message id={m.id} message={m.message}/>);
	let newMessageBody = props.dialogsPage.newMessageBody;

	let btnHandler = () => {
		props.dispatch(sendMessage())
	}

	let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		props.dispatch(updateNewMessageBody(e.currentTarget.value))
	}

	return (
		<div className={s.dialogs}>
			<nav className={s.dialogsItems}>
				{dialogsElements}
			</nav>
			<div className={s.messages}>
				<div>{messagesElements}</div>
				<div>
					<div>
						<textarea value={newMessageBody}
								  placeholder={'Enter your message'}
								  onChange={onNewMessageChange}
						>1</textarea>
					</div>
					<div>
						<button onClick={btnHandler}>Send</button>
					</div>
				</div>
			</div>
		</div>

	)
}

export default Dialogs;
