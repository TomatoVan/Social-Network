import React from 'react';
import {Anonymous} from '../../../../common/utils/BigHeads';
import s from './MsgRight.module.css'

type ChatRightPropsType = {
	rightMessages: Array<{ id: number, message: string }>
}
export const MsgRight = (props: ChatRightPropsType) => {

	const time = `${new Date().getHours()}:${new Date().getMinutes()}`

	return (
		<div>
			{props.rightMessages.map((m) => {
				return (
					<div className={s.msgRight} key={m.id}>
						<div className={s.textMsg}>
							{m.message}
							<div className={s.timeMsg}>{time}</div>
						</div>
						<div className={s.msgAvatarFriend}>{Anonymous()}</div>
					</div>
				)
			})}
		</div>
	)
}


