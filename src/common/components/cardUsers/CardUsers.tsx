import React, { FC, memo } from 'react'

import { Link } from 'react-router-dom'

import { setFollow } from '../../../features/users/usersReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Anonymous } from '../../utils/BigHeads'

import s from './CardUsers.module.css'

type CardUserPropsType = {
  name: string
  id: number
  photos: photoType
  status: string | null
  followed: boolean
  followingInProgress: Array<number>
  countryUser?: string | null
  cityUser?: string | null
}
type photoType = {
  small: string | null
  large: string | null
}

export const CardUsers: FC<CardUserPropsType> = memo(
  ({ cityUser, countryUser, followingInProgress, followed, status, id, name, photos }) => {
    const dispatch = useAppDispatch()

    const followingHandler = (id: number, followed: boolean) => {
      dispatch(setFollow(id, followed))
    }

    return (
      <div className={s.cardUser} key={id}>
        <div className={s.userLogo}>
          <Link to={'/profile/' + id}>
            {photos.small !== null ? (
              <img src={photos.small} alt={''} className={s.userLogoAvatar} />
            ) : (
              <div className={s.userLogoAvatar}>{Anonymous()}</div>
            )}
          </Link>
        </div>
        <div className={s.userInformText}>
          <h3 className={s.userName}>{name}</h3>
          <h5 className={s.userCountry}>
            {countryUser} {cityUser}
          </h5>
        </div>
        <div className={s.userInformText2}>
          <p className={s.userPhrase}>{status}</p>
        </div>
        <button
          className={followed ? s.followButton_FALSE : s.followButton_TRUE}
          disabled={followingInProgress.some(elem => elem === id)}
          onClick={() => followingHandler(id, followed)}
        >
          {followed ? '✔' : '+'}
        </button>
      </div>
    )
  }
)
