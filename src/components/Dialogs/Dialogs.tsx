import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DiaologItem/DialogItem";
import Message from "./Message/Message";
import {SubmitHandler, useForm} from "react-hook-form";
import f from "../../Login/Login.module.css";

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

type DialogsPageType = {
	dialogsPage: DialogPageType
	sendMessage: (newPost: string) => void
	updateNewMessageBody: (event: string) => void
	isAuth: boolean
}

type dialogsElementsMapType = {
	id: number,
	name: string
}
type messagesElementsMapType = {
	id: number,
	message: string
}

const Dialogs: React.FC<DialogsPageType> = (props) => {
	let dialogsElements = props.dialogsPage.dialogsData.map((d: dialogsElementsMapType) => <DialogItem key={d.id} id={d.id} name={d.name}/>);
	let messagesElements = props.dialogsPage.messagesData.map((m: messagesElementsMapType) => <Message key={m.id} id={m.id} message={m.message}/>);
	let newMessageBody = props.dialogsPage.newMessageBody;

	let btnHandlerCallback = (newPost: string) => {
		props.sendMessage(newPost)
		/*props.dispatch(sendMessage())*/
	}

	let onNewMessageChangeCallback = (event: ChangeEvent<HTMLTextAreaElement>) => {
		props.updateNewMessageBody(event.currentTarget.value)
		/*props.dispatch(updateNewMessageBody(e.currentTarget.value))*/
	}

	type Inputs = {
		message: string,
	};

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm<Inputs>({mode: "onSubmit"});
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data)
		reset();
		btnHandlerCallback(data.message)

	};

	return (
		<div className={s.dialogs}>
			<nav className={s.dialogsItems}>
				{dialogsElements}
			</nav>
			<div className={s.messages}>
				<div>{messagesElements}</div>
				<div>
					<div>
						<form onSubmit={handleSubmit(onSubmit)} className={s.postsForm}>
							{/*Message INPUT*/}
							<div>
								<textarea className={s.postTextField} {...register("message", {required: "The field is required"})} placeholder="Message"/>
								<div>
									{errors?.message && <p className={s.error}>{errors?.message?.message || "Error!"}</p>}
								</div>
							</div>
							{/*SUBMIT INPUT*/}
							<div>
								<input className={s.submitBtn} type="submit" value="Add post"/>
							</div>

						</form>


						{/*<textarea value={newMessageBody}
								  placeholder={'Enter your message'}
								  onChange={onNewMessageChangeCallback}
						>1</textarea>
					</div>
					<div>
						<button onClick={btnHandlerCallback}>Send</button>
					</div>*/}
					</div>
				</div>
			</div>
		</div>

	)
}

export default Dialogs;
