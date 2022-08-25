import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import './Login.module.css'
import f from './Login.module.css'
import {login} from './authReducer';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {Preloader} from '../../common/components/preloader/Preloader';

type LoginFormType = {
	email: string,
	password: string,
	rememberMe: boolean,
};

export const LoginForm = () => {

	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const status = useAppSelector(state => state.app.status)

	const {
		register, // Регистрация полей для формы
		handleSubmit, // для валидации, обертка над кастомным хэндлером(отправляет дату с формы, защищает отправку при ошибках)
		formState: {errors}, // объект с состояниями нашего стейта
		reset, //очищает форму после отправки
		setError // Функция позволяет вручную установить одну или несколько ошибок
	} = useForm<LoginFormType>({mode: 'onSubmit'});
	const onSubmit: SubmitHandler<LoginFormType> = (loginData) => {
		dispatch(login(loginData, setError))
		reset()
	};

	if (isAuth && status === 'idle') return <Navigate to="/"/>
	if (status === 'loading') return <Preloader/>

	return (
		<>
			<h1 className={f.login}>Login</h1>
			<form onSubmit={handleSubmit(onSubmit)} className={f.form}>
				<div>
					<label className={f.labelTextInput}>
						Login
						<input className={` ${errors.email ? f.errorBorder : f.textInput} `} {...register('email',
							{
								required: 'The field is required',
								minLength: {
									value: 5,
									message: 'Minimum 5 characters'
								},
							})} type="text"/>
					</label>
					<div>
						{errors?.email && <p className={f.error}>{errors?.email?.message || 'Error!'}</p>}
					</div>
				</div>
				<div>
					<label className={f.labelTextInput}>
						Password
						<input className={` ${errors.password ? f.errorBorder : f.textInput} `} {...register('password',
							{
								required: 'The field is required',
								minLength: {
									value: 5,
									message: 'Minimum 5 characters'

								},
							})} type="text"/>
					</label>
					<div>
						{errors?.password && <p className={f.error}>{errors?.password?.message || 'Error!'}</p>}
					</div>
				</div>
				<div>
					<label className={f.labelCheckbox}>
						Remember me
						<input {...register('rememberMe')} type="checkbox"/>
					</label>
				</div>
				<div>
					<input className={f.submitInput} type="submit" value="SUBMIT"/>
				</div>
			</form>
		</>
	)

}
