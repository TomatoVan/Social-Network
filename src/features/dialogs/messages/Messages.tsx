import React, {useState} from 'react';
import s from './Messages.module.css';
import {MessageDataType, sendMessage} from '../dialogsReducer';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {setError} from '../../../app/appReducer';
import {UsersMessages} from './usersMessages/UsersMessages';
import {MyMessages} from './myMessages/MyMessages';


export const Messages = () => {

	const dispatch = useAppDispatch()

	const messagesData = useAppSelector<MessageDataType>(state => state.dialogsPage['messagesData'])

	const [textAreaValue, setTextAreaValue] = useState('')

	const textAreaHandler = (e: string) => {
		setTextAreaValue(e)
	}
	const onclickSendMessageHandler = () => {
		if (textAreaValue.trim() !== '') {
			dispatch(sendMessage(textAreaValue))
			setTextAreaValue('')
		} else if (textAreaValue.trim() === '') {
			dispatch(setError('Message field is empty'))
		}


	}
	const enterHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && textAreaValue.trim() !== '') {
			dispatch(sendMessage(textAreaValue))
			setTextAreaValue('')
		} else if (event.key === 'Enter' && textAreaValue.trim() === '') {
			dispatch(setError('Message field is empty'))
		}

	}

	return (
		<>
			<div className={s.backChat}>
				<div className={s.chatNameUser}>Elina Malina</div>
				<div className={s.chat}>
					<UsersMessages leftMessages={messagesData.left}/>
					<MyMessages rightMessages={messagesData.right}/>
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



