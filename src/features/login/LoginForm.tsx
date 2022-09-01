import React from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { Preloader } from '../../common/components/preloader/Preloader'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'

import { login } from './authReducer'
import s from './Login.module.css'

export type LoginFormType = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const status = useAppSelector(state => state.app.status)

  const {
    register, // Регистрация полей для формы
    handleSubmit, // для валидации, обертка над кастомным хэндлером(отправляет дату с формы, защищает отправку при ошибках)
    formState: { errors }, // объект с состояниями нашего стейта
    reset, //очищает форму после отправки
    setError, // Функция позволяет вручную установить одну или несколько ошибок
  } = useForm<LoginFormType>({ mode: 'onSubmit' })
  const onSubmit: SubmitHandler<LoginFormType> = loginData => {
    dispatch(login(loginData, setError))
    reset()
  }

  if (isAuth && status === 'idle') return <Navigate to="/" />
  if (status === 'loading') return <Preloader />

  return (
    <>
      <h1 className={s.login}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div>
          <label className={s.labelTextInput}>
            Login
            <input
              className={` ${errors.email ? s.errorBorder : s.textInput} `}
              {...register('email', {
                required: 'The field is required',
                minLength: {
                  value: 5,
                  message: 'Minimum 5 characters',
                },
              })}
              type="text"
            />
          </label>
          <div>
            {errors?.email && <p className={s.error}>{errors?.email?.message || 'Error!'}</p>}
          </div>
        </div>
        <div>
          <label className={s.labelTextInput}>
            Password
            <input
              className={` ${errors.password ? s.errorBorder : s.textInput} `}
              {...register('password', {
                required: 'The field is required',
                minLength: {
                  value: 5,
                  message: 'Minimum 5 characters',
                },
              })}
              type="text"
            />
          </label>
          <div>
            {errors?.password && <p className={s.error}>{errors?.password?.message || 'Error!'}</p>}
          </div>
        </div>
        <div>
          <label className={s.labelCheckbox}>
            Remember me
            <input className={s.checkbox} {...register('rememberMe')} type="checkbox" />
          </label>
        </div>
        <div>
          <input className={s.submitInput} type="submit" value="SUBMIT" />
        </div>
      </form>
    </>
  )
}
