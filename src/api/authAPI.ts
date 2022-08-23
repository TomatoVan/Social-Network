import {instance} from './instance/instance';

export const authAPI = {
	getUserAuthData() {
		return instance.get<GetUserAuthDataResponseType>(`auth/me`)
	},
	login(email: string, password: string, rememberMe: boolean) {
		return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe})
	},
	logout() {
		return instance.delete<ResponseType>(`auth/login`)
	},
}

type LoginResponseType = {
	resultCode: number
	messages: Array<string>
	data: {
		userId: number
	}
	fieldsErrors: Array<{ error: string, field: string }>
}

type ResponseType = {
	resultCode: number
	messages: Array<string>
	data: {}
}

type GetUserAuthDataResponseType = {
	data: { id: number, email: string, login: string }
	resultCode: number
	messages: Array<string>
}