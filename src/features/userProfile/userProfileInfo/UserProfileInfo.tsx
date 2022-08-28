import React, {FC} from 'react';
import s from './UserProfileInfo.module.css';
import {Anonymous} from '../../../common/utils/BigHeads';
import {ProfileType} from '../../meProfile/meProfileReducer';


type ProfileInfoType = {
	profile: ProfileType,
	status: string
}

export const UserProfileInfo: FC<ProfileInfoType> = React.memo(({profile, status}) => {

	return (
		<div className={s.profileInform}>
			<div className={s.profileInfoLeft}>
				<div className={s.userLogo}>
					{!profile.photos.large ? Anonymous() :
						<img className={s.avatarUser} src={profile.photos.large} alt={'avatar'}/>}
				</div>
				<div className={s.profileInfoTextBox}>
					<div className={s.userName}>{profile.fullName}</div>
					<div className={s.containerText}>
						<b>Looking for job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
					</div>
					<div className={s.containerText}>
						<b>My skills:</b> {profile.lookingForAJobDescription}
					</div>
					<div className={s.containerText}>
						<b>About me:</b> {profile.aboutMe}
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
				<b>Status:</b>
				<div className={s.slogan}>{status}</div>
			</div>
		</div>
	)
})