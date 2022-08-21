import React, {FC} from 'react';
import s from '../Dialogs.module.css';


type MessagePropsType = {
	id: number
	message: string;
}

const Message: FC<MessagePropsType> = ({id, message}) => {
	return <div className={s.message}>{message}</div>
}


export default Message;
