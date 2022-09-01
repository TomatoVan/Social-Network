import React, { FC, memo } from 'react'

import { ElinaMalina } from '../../../common/utils/BigHeads'

import s from './DialogItem.module.css'

type DialogItemPropsType = {
  id: number
  name: string
  message: string
  active: boolean
}

export const DialogItem: FC<DialogItemPropsType> = memo(({ name, message, active }) => {
  return (
    <div className={active ? s.friendMsgTitle_ACTIVE : s.friendMsgTitle}>
      <div className={s.avatarBoxMsg}>{ElinaMalina()}</div>
      <div className={s.titleMsgNameAndTextMsg}>
        <div className={s.titleMsgUserName}>{name}</div>
        <div className={s.textMsgTitle}>{message}</div>
      </div>

      <div className={s.timeMsgTitleFriend}>
        <div>16:24</div>
      </div>
    </div>
  )
})
