import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
	isAuth: boolean,
	login: string | null,
	getUserAuthDataOnMount: () => void
}

const Header = (props: HeaderPropsType) => {
	// console.log(props)
	// debugger
	return <header className={s.header}>
		<img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' alt='1'/>

		<div className={s.loginBlock}>
			{props.isAuth ? props.login : <NavLink className={s.loginText} to={'/login'}>Login</NavLink>}
		</div>
	</header>
}

export default Header;