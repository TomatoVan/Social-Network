import React from 'react'

import s from './NotFound404.module.css'

export const NotFound404 = () => {
  return (
    <div>
      <div className={s.pageName}>Page not found :(</div>
      <div className={s.main404}>
        <div>404</div>
        <div>not found</div>
        <div className={s.backGif}></div>
      </div>
    </div>
  )
}
