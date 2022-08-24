import React from 'react';
import s from './DialogItem.module.css';
import {ElinaMalina} from '../../../common/utils/BigHeads';

type DialogItemPropsType = {
	id: number
	name: string
	message: string
}

export const DialogItem: React.FC<DialogItemPropsType> = ({name, message}) => {

	return (
		<div className={name === 'Elina Malina' ? s.friendMsgTitle_ACTIVE : s.friendMsgTitle}>
			<div className={s.avatarBoxMsg}>
				{ElinaMalina()}
			</div>
			<div className={s.titleMsgNameAndTextMsg}>
				<div className={s.titleMsgUserName}>{name}</div>
				<div className={s.textMsgTitle}>{message}</div>
			</div>

			<div className={s.timeMsgTitleFriend}>
				<div>
					16:24
				</div>
			</div>
		</div>
	)
}

