import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DiaologItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = (props: any) => {
	let dialogsElements = props.state.dialogsData.map((d: any) => <DialogItem id={d.id} name={d.name}/>);
	let messagesElements = props.state.messagesData.map((m: any) => <Message id={m.id} message={m.message}/>);

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
