import React, {ChangeEvent, FC} from 'react';
import s from './MeProfileInfo.module.css';
import {MeProfileStatus} from './MeProfileStatus';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {Anonymous} from '../../../common/utils/BigHeads';
import {saveMyPhoto} from '../meProfileReducer';


type ProfileInfoType = {
	isOwner: boolean
}

export const MeProfileInfo: FC<ProfileInfoType> = ({isOwner}) => {

	const dispatch = useAppDispatch()
	const profile = useAppSelector(state => state.meProfilePage.profile)

	const inputFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			dispatch(saveMyPhoto(e.target.files[0]))
		}
	}

	return <div>
		<div className={s.descriptionBlock}>
			<div>
				{profile.photos.small ? <img src={profile.photos.small} alt={''}/>
					: <div>{Anonymous()}</div>}
				{isOwner && <input type="file" onChange={inputFileHandler}/>}

				<MeProfileStatus isOwner={isOwner}/>
			</div>
			<div className={s.profileAbout}>
				<div>{profile.fullName}</div>
				<div>{profile.aboutMe}</div>
				<h3>Contacts</h3>
				<div>
					<a href={profile.contacts.facebook}>
						<span className={profile.contacts.facebook ? s.contactsSVG : s.noContacts}>Facebook</span>
					</a>
					<a href={profile.contacts.website ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>Website</span>
					</a>
					<a href={profile.contacts.vk ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>VK</span>
					</a>
					<a href={profile.contacts.twitter ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>Twitter</span>
					</a>
					<a href={profile.contacts.instagram ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>Instagram</span>
					</a>
					<a href={profile.contacts.youtube ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>YouTube</span>
					</a>
					<a href={profile.contacts.github ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>Github</span>
					</a>
					<a href={profile.contacts.mainLink ? s.contactsSVG : s.noContacts}>
						<span className={s.contactsSVG}>MainLink</span>
					</a>
				</div>
				<div className={profile.lookingForAJob ? s.lookingForAJob : s.NotLookingForAJob}>Looking for a Job{profile.lookingForAJob}</div>
				<div>{profile.lookingForAJobDescription}</div>
				<div>Мой Id: {profile.userId}</div>

			</div>
		</div>
	</div>
}
