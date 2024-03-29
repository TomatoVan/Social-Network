import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { UserType } from '../../api/usersAPI'
import { CardUsers } from '../../common/components/cardUsers/CardUsers'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import s from '../home/Home.module.css'
import { getUsers } from '../users/usersReducer'

export const Home = () => {
  const dispatch = useAppDispatch()

  const users = useAppSelector(state => state.usersPage.users)
  const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const status = useAppSelector(state => state.app.status)
  const login = useAppSelector(state => state.auth.login)
  const inProgress = useAppSelector(state => state.usersPage.inProgress)

  useEffect(() => {
    if (isAuth) dispatch(getUsers(1, 10))
  }, [dispatch, isAuth])

  if (!isAuth && status === 'idle') return <Navigate to="/login" />

  return (
    <>
      <div className={s.pageName}>HOME</div>
      <div className={s.homeMain}>
        <h1>
          News for you, <span className={s.highlight}>{login}</span>:
        </h1>
        <h1>
          All users: <span className={s.highlight}>{totalUsersCount}</span>
        </h1>
        <h1 className={s.description}>New samurai`s:</h1>
        <div className={s.container}>
          {users.map((user: UserType) => {
            return (
              <CardUsers
                name={user.name}
                key={user.id}
                id={user.id}
                photos={user.photos}
                status={user.status}
                followed={user.followed}
                followingInProgress={inProgress}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
