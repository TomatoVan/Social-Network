import React, {ChangeEvent, FC} from 'react';
import s from './MeProfileInfo.module.css';
import {MeProfileStatus} from './meProfileStatus/MeProfileStatus';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {Anonymous} from '../../../common/utils/BigHeads';
import {ProfileType, saveMyPhoto} from '../meProfileReducer';


type ProfileInfoType = {
	profile: ProfileType,
	status: string
}

export const MeProfileInfo: FC<ProfileInfoType> = ({profile, status}) => {

	const dispatch = useAppDispatch()

	const photoChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			dispatch(saveMyPhoto(e.target.files[0]))
		}
	}

	return (
		(
			<div className={s.profileInform}>
				<div className={s.profileInfoLeft}>
					<div className={s.container}>
						<div className={s.userLogo}>
							{!profile.photos.large ? Anonymous() :
								<img className={s.avatarUser} src={profile.photos.large} alt={'avatar'}/>}
						</div>
						<div className={s.input__wrapper}>
							<input onChange={photoChangeFileHandler} type="file" name="file" id="input__file" className={s.input__file}/>
							<label htmlFor="input__file" className={s.input__file_button}>
								<span className={s.input__file_button_text}>Change photo</span>
							</label>
						</div>
					</div>
					<div className={s.profileInfoTextBox}>
						<div className={s.userName}>{profile.fullName}</div>
						<div className={s.containerText}>
							<b>Looking for job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
						</div>
						<div className={s.containerText}>
							<b>My skills:</b> {profile.lookingForAJobDescription}
						</div>
						<br/>
						<div className={s.containerText}>
							<b>Contacts:</b> <br/>
							{Object.entries(profile.contacts).map((contact) => {
								if (contact[1]) {
									return (
										<div key={contact[0]}>
											<b><span>{contact[0]}</span></b>: <a href={`http://${contact[1]}`}>{contact[1]}</a>
										</div>
									)
								} else return null
							})}
						</div>
					</div>
				</div>
				<div className={s.profileInfoRight}>
					<MeProfileStatus status={status}/>
				</div>
			</div>
		)
	)

	// <div>
	// 	<div className={s.descriptionBlock}>
	// 		<div>
	// 			{profile.photos.small ? <img src={profile.photos.small} alt={''}/>
	// 				: <div>{Anonymous()}</div>}
	// 			<input type="file" onChange={inputFileHandler}/>
	//
	// 			<MeProfileStatus isOwner={isOwner}/>
	// 		</div>
	// 		<div className={s.profileAbout}>
	// 			<div>{profile.fullName}</div>
	// 			<h3>Contacts</h3>
	// 			<div>
	// 				<a href={profile.contacts.facebook}>
	// 					<span className={profile.contacts.facebook ? s.contactsSVG : s.noContacts}>Facebook</span>
	// 				</a>
	// 				<a href={profile.contacts.website ? s.contactsSVG : s.noContacts}>
	// 					<span className={s.contactsSVG}>Website</span>
	// 				</a>
	// 				<a href={profile.contacts.vk ? s.contactsSVG : s.noContacts}>
	// 					<span className={s.contactsSVG}>VK</span>
	// 				</a>
	// 				<a href={profile.contacts.twitter ? s.contactsSVG : s.noContacts}>
	// 					<span className={s.contactsSVG}>Twitter</span>
	// 				</a>
	// 				<a href={profile.contacts.instagram ? s.contactsSVG : s.noContacts}>
	// 					<span className={s.contactsSVG}>Instagram</span>
	// 				</a>
	// 				<a href={profile.contacts.youtube ? s.contactsSVG : s.noContacts}>
	// 					<span className={s.contactsSVG}>YouTube</span>
	// 				</a>
	// 				<a href={profile.contacts.github ? s.contactsSVG : s.noContacts}>
	// 					<span className={s.contactsSVG}>Github</span>
	// 				</a>
	// 				<a href={profile.contacts.mainLink ? s.contactsSVG : s.noContacts}>
	// 					<span className={s.contactsSVG}>MainLink</span>
	// 				</a>
	// 			</div>
	// 			<div className={profile.lookingForAJob ? s.lookingForAJob : s.NotLookingForAJob}>Looking for a Job{profile.lookingForAJob}</div>
	// 			<div>{profile.lookingForAJobDescription}</div>
	// 			<div>Мой Id: {profile.userId}</div>
	//
	// 		</div>
	// 	</div>
	// </div>
}
