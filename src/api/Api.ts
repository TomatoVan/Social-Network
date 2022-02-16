import axios from "axios";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	headers: {
		"API-KEY": "47936112-bafb-4835-bef5-2e2d6a25f152"
	}
})

export const usersAPI = {

	getUsers(currentPage: number = 1, pageSize: number = 10) {
		return instance.get(`/users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data)
	},

	getProfileUser(userId: any) {
		return instance.get(`/profile/` + userId)
			.then(response => response.data)
	},

	getUserAuthData() {
		return instance.get(`/auth/me`)
			.then(response => response.data)
	},

	setUnfollow(id: any) {
		return instance.delete(`/follow/${id}`)
			.then(response => response.data)
	},

	setFollow(id: any) {
		return instance.post(`/follow/${id}`)
			.then(response => response.data)
	},

}

