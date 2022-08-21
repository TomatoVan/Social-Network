import React from 'react';
import s from '../../../features/Users/Users.module.css';
import preloader from '../../../assets/icons/Spin.svg';


export const Preloader = () => {
	return (
		<div>
			<img className={s.preloader} src={preloader} alt={''}/>
		</div>
	);
};


