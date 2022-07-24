import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
	isAuth: boolean,
	login: string | null,
	logout: () => void
}

const Header = (props: HeaderPropsType) => {


	return <header className={s.header}>
		<img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' alt='1'/>

		<div className={s.loginBlock}>
			{!props.isAuth && <NavLink className={s.loginText} to={'/login'}>Login</NavLink>}

			<div>
				{props.login} - <button className={s.logoutBtn} onClick={props.logout}>Logout</button>
			</div>
		</div>
	</header>
}

export default Header;