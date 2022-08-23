import React from 'react';
import s from './Dialogs.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Navigate} from 'react-router-dom';
import {DialogItem} from './dialogItem/DialogItem';
import {Message} from './message/Message';
import {sendMessage} from './dialogsReducer';
import {Preloader} from '../../common/components/preloader/Preloader';

type dialogsElementsMapType = {
	id: number,
	name: string
}
type messagesElementsMapType = {
	id: number,
	message: string
}

type InputsFormType = {
	message: string,
};

export const Dialogs = () => {

	const dispatch = useAppDispatch()

	const status = useAppSelector(state => state.app.status)
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const dialogsData = useAppSelector(state => state.dialogsPage.dialogsData)
	const messagesData = useAppSelector(state => state.dialogsPage.messagesData)

	let dialogsElements = dialogsData.map((d: dialogsElementsMapType) => <DialogItem key={d.id} id={d.id} name={d.name}/>);
	let messagesElements = messagesData.map((m: messagesElementsMapType) => <Message key={m.id} id={m.id} message={m.message}/>);

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm<InputsFormType>({mode: 'onSubmit'});
	const onSubmit: SubmitHandler<InputsFormType> = (data) => {
		reset();
		dispatch(sendMessage(data.message))
	};

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>
	if (status === 'loading') return <Preloader/>

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


