import React from 'react';
import s from './Dialogs.module.css';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Navigate} from 'react-router-dom';
import {DialogItem} from './dialogItem/DialogItem';
import {Messages} from './message/Messages';
import {DialogDialogsDataElementType} from './dialogsReducer';

type dialogsElementsMapType = {
	id: number,
	name: string,
	message: string
}

export const Dialogs = () => {

	const status = useAppSelector(state => state.app.status)
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const dialogsData = useAppSelector<Array<DialogDialogsDataElementType>>(state => state.dialogsPage['dialogsData'])

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>

	return (
		<>
			<div className={s.pageName}>Messages</div>
			<div className={s.msgMain}>
				<div className={s.msgBoxLeft}>
					<div className={s.titleMsgBoxPage}>Friends:</div>
					{dialogsData.map((d: dialogsElementsMapType) =>
						<DialogItem key={d.id} id={d.id} name={d.name} message={d.message}/>
					)}
				</div>
				<div className={s.msgBoxRight}>
					<Messages/>
				</div>
			</div>
		</>


	)
}


