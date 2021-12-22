import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DiaologItem/DialogItem";
import Message from "./Message/Message";

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
}

type dialogsPageType = {
	dialogsPage: DialogPageType
}

const Dialogs: React.FC<dialogsPageType> = (props) => {
	let dialogsElements = props.dialogsPage.dialogsData.map((d: any) => <DialogItem id={d.id} name={d.name}/>);
	let messagesElements = props.dialogsPage.messagesData.map((m: any) => <Message id={m.id} message={m.message}/>);

	return (
		<div className={s.dialogs}>
			<nav className={s.dialogsItems}>
				{dialogsElements}
			</nav>
			<div className={s.messages}>
				{messagesElements}
			</div>
		</div>

	)
}

export default Dialogs;
