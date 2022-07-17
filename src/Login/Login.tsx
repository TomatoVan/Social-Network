import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import "./Login.module.css"
import s from "./Login.module.css"

export const LoginFrom = (props: any) => {

	type Inputs = {
		login: string,
		password: string,
		checkbox: boolean,
	};

	const {
		register, // Регистрация полей для формы
		handleSubmit, // для валидации, обертка над кастомным хэндлером(отправляет дату с формы, защищает отправку при ошибках)
		formState: {errors, isValid}, // объект с состояниями нашего стейта
		reset //очищает форму после отправки
	} = useForm<Inputs>({mode: "onBlur"});
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data)
		reset()
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/*LOGIN INPUT*/}
			<div>
				<label className={s.labelTextInput}>
					Login
					<input {...register("login",
						{
							required: "The field is required",
							minLength: {
								value: 5,
								message: "Minimum 5 characters"

							},
						})} type="text"/>
				</label>
				<div>
					{errors?.login && <p>{errors?.login?.message || "Error!"}</p>}
				</div>
			</div>
			{/*PASSWORD INPUT*/}
			<div>
				<label className={s.labelTextInput}>
					Password
					<input {...register("password",
						{
							required: "The field is required",
							minLength: {
								value: 5,
								message: "Minimum 5 characters"

							},
						})} type="text"/>
				</label>
				<div>
					{errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
				</div>
			</div>
			{/*CHECKBOX INPUT*/}
			<div>
				<label className={s.labelCheckbox}>
					Remember me
					<input {...register("checkbox")} type="checkbox"/>
				</label>
			</div>
			{/*SUBMIT INPUT*/}
			<div>
				<input type="submit" value="submit" disabled={!isValid}/>
			</div>
		</form>
	)
}

export const Login = (props: any) => {
	return (
		<div>
			<h1>Login</h1>
			<LoginFrom/>
		</div>
	)
}