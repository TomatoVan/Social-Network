import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Header } from '../common/components/header/Header'
import { Navbar } from '../common/components/navbar/Navbar'
import { ErrorSnackBar } from '../common/components/snackbars/ErrorSnackbar'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { getAuthUserData } from '../features/login/authReducer'
import { Main } from '../features/main/Main'
import { getMyProfile, getMyStatus } from '../features/meProfile/meProfileReducer'

import s from './App.module.css'

export const App = () => {
  const dispatch = useAppDispatch()
  const id = useAppSelector(state => state.auth.id)

  //navigate to home after page refresh if on different page
  const navigate = useNavigate()

  //get my profile
  useEffect(() => {
    if (id) {
      dispatch(getMyProfile(id.toString()))
      dispatch(getMyStatus(id.toString()))
    }
  }, [dispatch, id])

  //auth
  useEffect(() => {
    dispatch(getAuthUserData())
    navigate('/')
  }, [dispatch])

  return (
    <div className={s.app}>
      <Header />
      <div className={s.flexMain}>
        <Navbar />
        <Main />
      </div>
      <ErrorSnackBar />
    </div>
  )
}
