import React, {FC} from 'react';
import s from '../greetings/Greetings.module.css'
import {Sun} from '../../../assets/sun';
import morningIcon from '../../../assets/morning.png';
import sunIcon from '../../../assets/sun.svg';
import sunsetIcon from '../../../assets/sunset.png';
import nightIcon from '../../../assets/night.png';

type PropsType = {
	isAuth: boolean
	login: string | null
}

export const Greetings: FC<PropsType> = ({isAuth, login}) => {

	const dateHours = new Date().getHours()

	return (
		<>
			{isAuth
				?
				<div className={s.container}>
					{dateHours >= 6 && dateHours < 11 && <><img className={s.iconStyle} src={morningIcon} alt={'nightIcon'}/> Good morning, {login}!</>}
					{dateHours >= 11 && dateHours < 17 && <> <img className={s.iconStyle} src={sunIcon} alt={'sunIcon'}/> Good day, {login}!</>}
					{dateHours >= 17 && dateHours < 24 && <> <img className={s.iconStyle} src={sunsetIcon} alt={'sunsetIcon'}/> Good evening, {login}!</>}
					{dateHours >= 0 && dateHours < 6 && <><img className={s.iconStyle} src={nightIcon} alt={'nightIcon'}/> Good night, {login}!</>}
				</div>
				:
				<div className={s.container}>
					<Sun/>
					Hi, friend!
				</div>
			}
		</>
	)
};

