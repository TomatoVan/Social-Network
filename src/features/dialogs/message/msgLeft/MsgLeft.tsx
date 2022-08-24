import React from 'react';
import s from './MsgLeft.module.css'
import {ElinaMalina} from '../../../../common/utils/BigHeads';

type ChatLeftPropsType = {
	leftMessages: Array<{ id: number, message: string }>
}

export const MsgLeft = function (props: ChatLeftPropsType) {

	return (
		<div>
			{props.leftMessages.map(m => {
				return (
					<div className={s.msgLeft} key={m.id}>
						<div className={s.msgAvatarFriend}>{ElinaMalina()}</div>
						<div className={s.textMsg}>
							What? What you doing?! Lorem ipsum dolor septim sanctum!
							Error 404 not found!
							<div className={s.timeMsg}>16:25</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}