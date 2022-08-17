import {instance} from './instance/instance';

export const authAPI = {
	getUserAuthData() {
		return instance.get<GetUserAuthDataType>(`auth/me`)
			.then(response => response.data)
	},
	login(email: string, password: string, rememberMe: boolean) {
		return instance.post<any>(`auth/login`, {email, password, rememberMe})
			.then(response => response.data)
	},
	logout() {
		return instance.delete<ResponseType>(`auth/login`)
			.then(response => response.data)
	},
}
type ResponseType = {
	resultCode: number
	messages: Array<string>
	data: {}
}

type GetUserAuthDataType = {
	data: { id: number, email: string, login: string }
	resultCode: number
	messages: Array<string>
}