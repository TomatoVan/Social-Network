import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import './Login.module.css'
import f from './Login.module.css'
import {login, LoginDataType} from './authReducer';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {Navigate} from 'react-router-dom';

type LoginFormType = {
	login: (loginData: LoginDataType, setError: any) => void,
	isAuth: boolean,

}

type MapStateType = {
	isAuth: boolean
}

type FormTypes = {
	email: string,
	password: string,
	rememberMe: boolean,
};

const LoginForm = (props: LoginFormType) => {

	const {
		register, // Регистрация полей для формы
		handleSubmit, // для валидации, обертка над кастомным хэндлером(отправляет дату с формы, защищает отправку при ошибках)
		formState: {errors}, // объект с состояниями нашего стейта
		reset, //очищает форму после отправки
		setError // Функция позволяет вручную установить одну или несколько ошибок
	} = useForm<FormTypes>({mode: 'onSubmit'});
	const onSubmit: SubmitHandler<FormTypes> = (loginData) => {
		props.login(loginData, setError)
		reset()
	};

	return <>
		{props.isAuth && <Navigate to="/me"/>}

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
}

const mapStateToProps = (state: AppRootStateType): MapStateType => ({
	isAuth: state.auth['isAuth']
})

export default connect(mapStateToProps, {login})(LoginForm)