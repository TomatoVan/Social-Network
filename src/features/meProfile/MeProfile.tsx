import React, { useCallback, useState } from 'react'

import { Navigate } from 'react-router-dom'

import { Preloader } from '../../common/components/preloader/Preloader'
import { ProfileEditForm } from '../../common/components/profileEditForm/ProfileEditForm'
import { useAppSelector } from '../../common/hooks/useAppSelector'

import { MePosts } from './mePosts/MePosts'
import { MeProfileInfo } from './meProfileInfo/MeProfileInfo'

export const MeProfile = () => {
  const profile = useAppSelector(state => state.meProfilePage.profile)
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const status = useAppSelector(state => state.app.status)
  const meStatusText = useAppSelector(state => state.meProfilePage.status)

  const [edit, setEdit] = useState<boolean>(false)

  const changeEditModeProfileCallback = useCallback(() => {
    setEdit(!edit)
  }, [edit])

  if (!isAuth && status === 'idle') return <Navigate to="/login" />
  if (!profile) return <Preloader />

  return (
    <div>
      <MeProfileInfo
        profile={profile}
        status={meStatusText}
        setEditCallback={changeEditModeProfileCallback}
      />
      {edit ? <ProfileEditForm setEditCallback={changeEditModeProfileCallback} /> : <MePosts />}
    </div>
  )
}
