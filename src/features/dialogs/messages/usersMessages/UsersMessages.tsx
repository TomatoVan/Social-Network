import React, { FC, memo } from 'react'

import { ElinaMalina } from '../../../../common/utils/BigHeads'

import s from './UserMessages.module.css'

type ChatLeftPropsType = {
  messages: Array<{ id: number; message: string }>
}

export const UsersMessages: FC<ChatLeftPropsType> = memo(({ messages }) => {
  return (
    <div>
      {messages.map(m => {
        return (
          <div className={s.msgLeft} key={m.id}>
            <div className={s.msgAvatarFriend}>{ElinaMalina()}</div>
            <div className={s.textMsg}>
              What? What you doing?! Lorem ipsum dolor septim sanctum! Error 404 not found!
              <div className={s.timeMsg}>16:25</div>
            </div>
          </div>
        )
      })}
    </div>
  )
})
