import React from 'react';
import {Anonymous} from '../../../../common/utils/BigHeads';
import s from './MyMessages.module.css'
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {Preloader} from '../../../../common/components/preloader/Preloader';

type ChatRightPropsType = {
	rightMessages: Array<{ id: number, message: string }>
}
export const MyMessages = (props: ChatRightPropsType) => {

	const profile = useAppSelector(state => state.profilePage.profile)
	const time = `${new Date().getHours()}:${new Date().getMinutes()}`

	if (!profile) return <Preloader/>

	return (
		<div>
			{props.rightMessages.map((m) => {
				return (
					<div className={s.msgRight} key={m.id}>
						<div className={s.textMsg}>
							{m.message}
							<div className={s.timeMsg}>{time}</div>
						</div>
						{/*<div className={s.msgAvatarFriend}>{profile.photos.small}</div>*/}
						{profile.photos.small ?
							<img className={s.msgAvatarFriend} src={profile.photos.small} alt={''}/>
							: <div className={s.msgAvatarFriendAnonymous}>{Anonymous()}</div>}
					</div>
				)
			})}
		</div>
	)
}


