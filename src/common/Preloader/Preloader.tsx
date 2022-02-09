import React from 'react';
import s from "../../components/Users/Users.module.css";
import preloader from "../../assets/icons/Spin.svg";


const Preloader = () => {
	return (
		<div>
			<img className={s.preloader} src={preloader} alt={''}/>
		</div>
	);
};

export default Preloader;
