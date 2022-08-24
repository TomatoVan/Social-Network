import {instance} from './instance/instance';

export const profileAPI = {
	getUserProfile(userId: string) {
		return instance.get<UserProfileResponseType>(`profile/` + userId)
	},
	getUserStatus(userId: string) {
		return instance.get(`profile/status/` + userId)
	},
	updateUserStatus(status: string) {
		return instance.put<ResponseType>(`profile/status/`, {status})
	},
	getPhotos(photoFile: File) {
		const formData = new FormData()
		formData.append('Image', photoFile)
		return instance.put<any>(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},
}
type ResponseType = {
	resultCode: number
	messages: Array<string>
	data: {}
}

export type UserProfileResponseType = {
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