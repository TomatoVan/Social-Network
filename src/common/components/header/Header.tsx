import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {logout} from '../../../features/login/authReducer';
import moon from '../../../assets/moon.png'
import {Greetings} from '../greetings/Greetings';
import {Anonymous} from '../../utils/BigHeads';

export const Header = () => {

	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const avatar = useAppSelector(state => state.profilePage.profile?.photos.small)
	const login = useAppSelector(state => state.auth.login)


	const logOutHandler = () => {
		dispatch(logout())
	}

	return (
		<div className={s.header}>
			<div className={s.flexBoxHeaderLeft}>
				<div className={s.logotype}>
					<img src={moon} alt="moon" width={'60px'} height={'60px'}/>
				</div>

				<NavLink className={s.siteTitle} to={'/me'}>
					Social Network
				</NavLink>
			</div>

			<div className={s.flexBoxHeaderCenter}>
				<Greetings isAuth={isAuth} login={login}/>
			</div>

			<div className={s.flexBoxHeaderUserLogo}>
				{isAuth ?
					<div className={s.boxHeaderAvatarAndExit}>
						<button className={s.buttonExit} onClick={logOutHandler}>Logout</button>
						{avatar !== null
							? <NavLink to={'/me'}><img className={s.logoUser} src={avatar} alt={'avatar'}/></NavLink>
							: Anonymous()
						}
					</div> :
					<NavLink className={s.login_btn} to={'/login'}>Login</NavLink>
				}
			</div>
		</div>


	)
}

