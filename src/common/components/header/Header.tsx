import React from 'react'

import { NavLink } from 'react-router-dom'

import moon from '../../../assets/moon.png'
import { logout } from '../../../features/login/authReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Anonymous } from '../../utils/BigHeads'
import { Greetings } from '../greetings/Greetings'
import { Preloader } from '../preloader/Preloader'

import s from './Header.module.css'

export const Header = () => {
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(state => state.auth.isAuth)
  const avatar = useAppSelector(state => state.meProfilePage.profile?.photos.small)
  const login = useAppSelector(state => state.auth.login)
  const status = useAppSelector(state => state.app.status)
  const logOutHandler = () => {
    dispatch(logout())
  }

  if (!avatar && status === 'loading') return <Preloader />

  return (
    <div className={s.header}>
      <div className={s.flexBoxHeaderLeft}>
        <div className={s.logotype}>
          <img src={moon} alt="moon" width={'60px'} height={'60px'} />
        </div>

        <NavLink className={s.siteTitle} to={'/me'}>
          Social Network
        </NavLink>
      </div>

      <div className={s.flexBoxHeaderCenter}>
        <Greetings isAuth={isAuth} login={login} />
      </div>

      <div className={s.flexBoxHeaderUserLogo}>
        {isAuth ? (
          <div className={s.boxHeaderAvatarAndExit}>
            <button className={s.buttonExit} onClick={logOutHandler}>
              Logout
            </button>
            {avatar !== null ? (
              <NavLink to={'/me'}>
                <img className={s.logoUser} src={avatar} alt={'avatar'} />
              </NavLink>
            ) : (
              <div className={s.logoUser}>{Anonymous()}</div>
            )}
          </div>
        ) : (
          <NavLink className={s.login_btn} to={'/login'}>
            Login
          </NavLink>
        )}
      </div>
    </div>
  )
}
