import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo = (props: any) => {
	return <div>
		<div>
			<img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
				 alt={"prof"}/>
		</div>
		<div className={s.descriptionBlock}>
			<img src={props.profile.photos.large} alt={''}/>
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