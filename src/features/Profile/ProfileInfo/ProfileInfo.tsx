import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileStatus} from './ProfileStatus';
import {ProfileType} from '../ProfileContainer';
import userPhoto from '../../../assets/images/1.png'


type ProfileInfoType = {
	profile: ProfileType
	status: string
	updateUserStatus: (status: string) => void
	isOwner: boolean | null
	savePhoto: any
}

const ProfileInfo = (props: ProfileInfoType) => {


	const inputFileHandler = (e: any) => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0])
		}
	}

	return <div>
		<div className={s.descriptionBlock}>
			<div>
				<img src={props.profile.photos.small || userPhoto} alt={''}/>
				{props.isOwner && <input type="file" onChange={inputFileHandler}/>}

				<ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
			</div>
			<div className={s.profileAbout}>
				<div>{props.profile.fullName}</div>
				<div>{props.profile.aboutMe}</div>
				<h3>Contacts</h3>
				<div>
					<a href={props.profile.contacts.facebook}>
						<span className={props.profile.contacts.facebook ? s.contactsSVG : s.noContacts}>Facebook</span>
					</a>
					<a href={props.profile.contacts.website ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>Website</span>
					</a>
					<a href={props.profile.contacts.vk ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>VK</span>
					</a>
					<a href={props.profile.contacts.twitter ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>Twitter</span>
					</a>
					<a href={props.profile.contacts.instagram ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>Instagram</span>
					</a>
					<a href={props.profile.contacts.youtube ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>YouTube</span>
					</a>
					<a href={props.profile.contacts.github ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>Github</span>
					</a>
					<a href={props.profile.contacts.mainLink ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>MainLink</span>
					</a>
				</div>
				<div className={props.profile.lookingForAJob ? s.lookingForAJob : s.NotLookingForAJob}>Looking for a Job{props.profile.lookingForAJob}</div>
				<div>{props.profile.lookingForAJobDescription}</div>
				<div>Мой Id: {props.profile.userId}</div>

			</div>
		</div>
	</div>
}
export default ProfileInfo;