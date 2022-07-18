import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import "./Login.module.css"
import f from "./Login.module.css"
import {login} from "../redux/authReducer";
import {useDispatch} from "react-redux";

export const LoginForm = () => {

	type Inputs = {
		email: string,
		password: string,
		rememberMe: boolean,
	};

	const dispatch = useDispatch()

	const {
		register, // Регистрация полей для формы
		handleSubmit, // для валидации, обертка над кастомным хэндлером(отправляет дату с формы, защищает отправку при ошибках)
		formState: {errors, isValid}, // объект с состояниями нашего стейта
		reset //очищает форму после отправки
	} = useForm<Inputs>({mode: "onBlur"});
	const onSubmit: SubmitHandler<Inputs> = (loginData) => {
		console.log(loginData)
		dispatch(login(loginData))
		reset()
	};

	return <>
		<h1 className={f.login}>Login</h1>
		<form onSubmit={handleSubmit(onSubmit)} className={f.form}>
			{/*LOGIN INPUT*/}
			<div>
				<label className={f.labelTextInput}>
					Login
					<input className={` ${errors.email ? f.errorBorder : f.textInput} `} {...register("email",
						{
							required: "The field is required",
							minLength: {
								value: 5,
								message: "Minimum 5 characters"

							},
						})} type="text"/>
				</label>
				<div>
					{errors?.email && <p className={f.error}>{errors?.email?.message || "Error!"}</p>}
				</div>
			</div>
			{/*PASSWORD INPUT*/}
			<div>
				<label className={f.labelTextInput}>
					Password
					<input className={` ${errors.password ? f.errorBorder : f.textInput} `} {...register("password",
						{
							required: "The field is required",
							minLength: {
								value: 5,
								message: "Minimum 5 characters"

							},
						})} type="text"/>
				</label>
				<div>
					{errors?.password && <p className={f.error}>{errors?.password?.message || "Error!"}</p>}
				</div>
			</div>
			{/*CHECKBOX INPUT*/}
			<div>
				<label className={f.labelCheckbox}>
					Remember me
					<input {...register("rememberMe")} type="checkbox"/>
				</label>
			</div>
			{/*SUBMIT INPUT*/}
			<div>
				<input className={f.submitInput} type="submit" value="SUBMIT" disabled={!isValid}/>
			</div>
		</form>
	</>
}
