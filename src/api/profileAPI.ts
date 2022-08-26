import {instance} from './instance/instance';
import {ProfileType} from '../features/meProfile/meProfileReducer';

export const profileAPI = {
	getUserProfile(userId: string) {
		return instance.get<UserProfileResponseType>(`profile/` + userId)
	},
	getUserStatus(userId: string) {
		return instance.get(`profile/status/` + userId)
	},
	updateUserProfile(profileData: ProfileType) {
		return instance.put('profile', profileData)
	},
	updateUserStatus(status: string) {
		return instance.put<ResponseType<{}>>(`profile/status/`, {status})
	},
	getPhotos(photoFile: File) {
		const formData = new FormData()
		formData.append('Image', photoFile)
		return instance.put<ResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},
}
type ResponseType<T> = {
	resultCode: number
	messages: Array<string>
	data: T
}

type PhotosType = {
	small: string | null,
	large: string | null
}

export type UserProfileResponseType = {
	aboutMe: string
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
	photos: PhotosType
}