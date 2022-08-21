import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemPropsType = {
	id: number
	name: string
}

const DialogItem: React.FC<DialogItemPropsType> = ({id, name}) => {

	return (<div className={s.dialog}>
		<NavLink to={'/dialogs/' + id} className={({isActive}) => isActive ? `${s.active}` : ''}>{name}</NavLink>
	</div>);
}

export default DialogItem;