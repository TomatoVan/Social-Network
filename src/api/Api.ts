import axios from "axios";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	headers: {
		"API-KEY": "e53bd4e2-48e0-477a-b70a-83002085f133"
	}
})
type UserType = {
	id: number
	name: string
	status: string
	photos: { small: string, large: string }
	followed: boolean
}
type UsersType = {
	items: Array<UserType>
	totalCount: number
	error: string
}

type GetUserAuthDataType = {
	data: { id: number, email: string, login: string }
	resultCode: number
	messages: Array<string>
}

type ResponseType = {
	resultCode: number
	messages: Array<string>
	data: {}
}

type UserProfileType = {
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: {
		github: string,
		vk: string,
		facebook: string,
		instagram: string,
		twitter: string,
		website: string,
		youtube: string,
		mainLink: string,
	}
	photos: { small: string, large: string }
}

export const usersAPI = {

	getUsers(currentPage: number = 1, pageSize: number = 10) {
		return instance.get<UsersType>(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				console.log(response.data)
				return response.data
			})
	},

	setUnfollow(id: number) {
		return instance.delete<ResponseType>(`follow/${id}`)
			.then(response => response.data)
	},

	setFollow(id: number) {
		return instance.post<ResponseType>(`follow/${id}`)
			.then(response => response.data)
	},

}

export const authAPI = {
	getUserAuthData() {
		return instance.get<GetUserAuthDataType>(`auth/me`)
			.then(response => response.data)
	},
	login(email: string, password: string, rememberMe: boolean) {
		return instance.post<ResponseType>(`auth/login`, {email, password, rememberMe})
			.then(response => response.data)
	},
	logout() {
		return instance.delete<ResponseType>(`auth/login`)
			.then(response => response.data)
	},
}

export const profileAPI = {
	getUserProfile(userId: string) {
		return instance.get<UserProfileType>(`profile/` + userId)
			.then(response => response.data)
	},
	getUserStatus(userId: string) {
		return instance.get(`profile/status/` + userId)
			.then(response => response.data)
	},
	updateUserStatus(status: any) {
		return instance.put<ResponseType>(`profile/status/`, {status})
			.then(response => response.data)
	},
}
