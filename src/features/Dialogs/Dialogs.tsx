import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DiaologItem/DialogItem';
import Message from './Message/Message';
import {SubmitHandler, useForm} from 'react-hook-form';

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

	let btnHandlerCallback = (newPost: string) => {
		props.sendMessage(newPost)
	}

	type Inputs = {
		message: string,
	};

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm<Inputs>({mode: 'onSubmit'});
	const onSubmit: SubmitHandler<Inputs> = (data) => {
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
							<div>
								<textarea className={s.postTextField} {...register('message', {required: 'The field is required'})} placeholder="Message"/>
								<div>
									{errors?.message && <p className={s.error}>{errors?.message?.message || 'Error!'}</p>}
								</div>
							</div>
							<div>
								<input className={s.submitBtn} type="submit" value="Add post"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

	)
}

export default Dialogs;
