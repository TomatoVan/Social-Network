import React, {FC, useState} from 'react';
import s from './Messages.module.css';
import {MessageDataType, sendMessage} from '../dialogsReducer';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {MsgRight} from './MsgRight/MsgRight';
import {MsgLeft} from './MsgLeft/MsgLeft';


export const Messages: FC<any> = () => {

	const dispatch = useAppDispatch()

	const messagesData = useAppSelector<MessageDataType>(state => state.dialogsPage['messagesData'])

	const [textAreaValue, setTextAreaValue] = useState('')

	const textAreaHandler = (e: string) => {
		setTextAreaValue(e)
	}
	const onclickSendMessageHandler = () => {
		if (textAreaValue !== '') {
			dispatch(sendMessage(textAreaValue))
			setTextAreaValue('')
		}

	}
	const enterHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.charCode === 13 && textAreaValue !== '') {
			dispatch(sendMessage(textAreaValue))
			setTextAreaValue('')
		}
	}

	return (
		<>
			<div className={s.backChat}>
				<div className={s.chatNameUser}>Elina Malina</div>
				<div className={s.chat}>
					<MsgLeft leftMessages={messagesData.left}/>
					<MsgRight rightMessages={messagesData.right}/>
				</div>
				<div className={s.sendMsgArea}>
                <textarea className={s.sendMsgTextArea}
													value={textAreaValue}
													onChange={(e) => textAreaHandler(e.currentTarget.value)}
													placeholder={'Send message...'}
													onKeyPress={(event) => enterHandler(event)}
								>
                </textarea>
					<button className={s.btnSendMsg} onClick={onclickSendMessageHandler}>send</button>
				</div>
			</div>
		</>
	)
}



