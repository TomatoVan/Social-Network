import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props: any) => {

	return <header className={s.header}>
		<img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' alt='1'/>

		<div className={s.loginBlock}>
			{props.isAuth ? props.login : <NavLink className={s.loginText} to={'/login'}>Login</NavLink>}
		</div>
	</header>
}

export default Header;