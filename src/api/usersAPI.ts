import {instance} from './instance/instance';

export const usersAPI = {

	getUsers(currentPage: number = 1, pageSize: number = 10) {
		return instance.get<UsersType>(`users?page=${currentPage}&count=${pageSize}`)
	},

	setUnfollow(id: number) {
		return instance.delete<ResponseType>(`follow/${id}`)
	},

	setFollow(id: number) {
		return instance.post<ResponseType>(`follow/${id}`)
	},

}

type ResponseType = {
	resultCode: number
	messages: Array<string>
	data: {}
}

export type UserType = {
	followed: boolean
	id: number
	name: string
	photos: {
		small: string | null
		large: string | null
	}
	status: string | null
	uniqueUrlName: string | null
}

export type UsersType = {
	items: Array<UserType>
	totalCount: number
	error: string
}