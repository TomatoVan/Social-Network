import React, {ChangeEvent, FC} from 'react';
import s from './MeProfileInfo.module.css';
import {MeProfileStatus} from './meProfileStatus/MeProfileStatus';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {Anonymous} from '../../../common/utils/BigHeads';
import {ProfileType, saveMyPhoto} from '../meProfileReducer';


type ProfileInfoType = {
	profile: ProfileType,
	status: string
	setEditCallback: () => void
}

export const MeProfileInfo: FC<ProfileInfoType> = ({profile, status, setEditCallback}) => {

	const dispatch = useAppDispatch()

	const photoChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			dispatch(saveMyPhoto(e.target.files[0]))
		}
	}
	const changeEditModeProfileCallback = () => {
		setEditCallback()
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
						<button className={s.editProfileButton} onClick={changeEditModeProfileCallback}>Edit profile</button>
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
}
