import axios from "axios";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	headers: {
		"API-KEY": "e53bd4e2-48e0-477a-b70a-83002085f133"
	}
})

export const usersAPI = {

	getUsers(currentPage: number = 1, pageSize: number = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				console.log(response.data)
				return response.data
			})
	},

	setUnfollow(id: number) {
		return instance.delete(`follow/${id}`)
			.then(response => response.data)
	},

	setFollow(id: number) {
		return instance.post(`follow/${id}`)
			.then(response => response.data)
	},

}

export const authAPI = {
	getUserAuthData() {
		return instance.get(`auth/me`)
			.then(response => response.data)
	},
}

export const profileAPI = {
	getUserProfile(userId: string) {
		return instance.get(`profile/` + userId)
			.then(response => response.data)
	},
	getUserStatus(userId: string) {
		return instance.get(`profile/status/` + userId)
			.then(response => response.data)
	},
	updateUserStatus(status: any) {
		return instance.put(`profile/status/`, {status})
			.then(response => response.data)
	},
}
