import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemPropsType = {
	id: number
	name: string
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
	return (<div className={s.dialog}>
		<NavLink to={'/dialogs/' + props.id} className={({isActive}) => isActive ? `${s.active}` : ''}>{props.name}</NavLink>
	</div>);
}

export default DialogItem;