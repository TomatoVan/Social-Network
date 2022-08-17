import {instance} from './instance/instance';

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