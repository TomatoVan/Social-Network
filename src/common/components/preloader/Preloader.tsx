import React from 'react'

import preloader from '../../../assets/icons/Spin.svg'

import s from './Preloader.module.css'

export const Preloader = () => {
  return (
    <div>
      <img className={s.preloader} src={preloader} alt={''} />
    </div>
  )
}
