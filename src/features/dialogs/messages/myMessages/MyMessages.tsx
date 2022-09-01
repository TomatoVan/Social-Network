import React, { FC, memo } from 'react'

import { Preloader } from '../../../../common/components/preloader/Preloader'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { Anonymous } from '../../../../common/utils/BigHeads'

import s from './MyMessages.module.css'

type ChatRightPropsType = {
  messages: Array<{ id: number; message: string }>
}
export const MyMessages: FC<ChatRightPropsType> = memo(({ messages }) => {
  const profile = useAppSelector(state => state.meProfilePage.profile)
  const time = `${new Date().getHours()}:${new Date().getMinutes()}`

  if (!profile) return <Preloader />

  return (
    <div>
      {messages.map(m => {
        return (
          <div className={s.msgRight} key={m.id}>
            <div className={s.textMsg}>
              {m.message}
              <div className={s.timeMsg}>{time}</div>
            </div>
            {profile.photos.small ? (
              <img className={s.msgAvatarFriend} src={profile.photos.small} alt={''} />
            ) : (
              <div className={s.msgAvatarFriendAnonymous}>{Anonymous()}</div>
            )}
          </div>
        )
      })}
    </div>
  )
})
