import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { NotFound404 } from '../../common/components/404/NotFound404'
import { Dialogs } from '../dialogs/Dialogs'
import { Home } from '../home/Home'
import { LoginForm } from '../login/LoginForm'
import { MeProfile } from '../meProfile/MeProfile'
import { Music } from '../music/Music'
import { Settings } from '../settings/Settings'
import { UserProfile } from '../userProfile/UserProfile'
import { Users } from '../users/Users'

import s from './Main.module.css'

export const Main = () => {
  return (
    <div className={s.main}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="me" element={<MeProfile />} />
        <Route path="profile/:userId" element={<UserProfile />} />
        <Route path="messages" element={<Dialogs />} />
        <Route path="friends" element={<Users />} />
        <Route path="music" element={<Music />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<LoginForm />} />
        <Route path={'*'} element={<NotFound404 />} />
      </Routes>
    </div>
  )
}
