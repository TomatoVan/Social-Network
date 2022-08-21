import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {logout} from '../Login/authReducer';

export const Header = () => {

	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const login = useAppSelector(state => state.auth.login)

	const logOutHandler = () => {
		dispatch(logout())
	}


	return <header className={s.header}>
		<img src="https://www.freelogodesign.org/Content/img/logo-ex-7.png" alt="1"/>

		<div className={s.loginBlock}>
			{!isAuth && <NavLink className={s.loginText} to={'/login'}>Login</NavLink>}

			<div>
				{login} - <button className={s.logoutBtn} onClick={logOutHandler}>Logout</button>
			</div>
		</div>
	</header>
}

