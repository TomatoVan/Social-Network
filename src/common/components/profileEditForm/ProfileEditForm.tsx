import React, {FC} from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ProfileType, updateMyProfile} from '../../../features/meProfile/meProfileReducer';
import s from './ProfileEditForm.module.css'
import {Navigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';

type PropsType = {
	setEditCallback: () => void
}

export const ProfileEditForm: FC<PropsType> = ({setEditCallback}) => {

	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const status = useAppSelector(state => state.app.status)
	const profile = useAppSelector(state => state.meProfilePage.profile)
	const myId = useAppSelector(state => state.auth.id)

	const {
		register,
		handleSubmit
	} = useForm<ProfileType>({
		mode: 'onSubmit',
		defaultValues: {
			userId: profile.userId,
			lookingForAJob: profile.lookingForAJob,
			lookingForAJobDescription: profile.lookingForAJobDescription,
			fullName: profile.fullName,
			aboutMe: profile.aboutMe,
			contacts: {
				github: profile.contacts.github,
				vk: profile.contacts.vk,
				facebook: profile.contacts.facebook,
				instagram: profile.contacts.instagram,
				twitter: profile.contacts.twitter,
				website: profile.contacts.website,
				youtube: profile.contacts.youtube,
				mainLink: profile.contacts.mainLink
			}
		}
	});
	const onSubmit: SubmitHandler<ProfileType> = (profileData) => {
		if (myId) {
			dispatch(updateMyProfile(myId.toString(), profileData))
			setEditCallback()
		}

	};

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>

	return (
		<>
			<form className={s.profileEditBox} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.main}>
					<div className={s.containerLeft}>
						<div className={s.editProfileTitle}>Edit profile:</div>

						<div className={s.element}>
							<b>Full name: </b>
							<input id={'fullName'}
										 {...register('fullName')}
										 className={s.inputElement}/>
						</div>

						<div className={s.element}>
							<b>Looking for job: </b>
							<input className={s.checkboxElement} {...register('lookingForAJob')} type="checkbox"/>
						</div>
						<div className={s.element}>
							<b>My skills: </b>
							<input id={'lookingForAJobDescription'}
										 {...register('lookingForAJobDescription')}
										 className={s.inputElement}/>
						</div>
						<div className={s.element}>
							<b>About me: </b>
							<input id={'aboutMe'}
										 {...register('aboutMe')}
										 className={s.inputElement}/>
						</div>
					</div>

					<div className={s.containerRight}>
						<div className={s.editProfileTitle}>Contacts:</div>

						<div className={s.element}>
							<b>Github: </b>
							<input id={'contacts.github'}
										 {...register('contacts.github')}
										 className={s.inputElement}/>
						</div>

						<div className={s.element}>
							<b>VK: </b>
							<input id={'contacts.vk'}
										 {...register('contacts.vk')}
										 className={s.inputElement}/>
						</div>

						<div className={s.element}>
							<b>Facebook: </b>
							<input id={'contacts.facebook'}
										 {...register('contacts.facebook')}
										 className={s.inputElement}/>
						</div>

						<div className={s.element}>
							<b>Instagram: </b>
							<input id={'contacts.instagram'}
										 {...register('contacts.instagram')}
										 className={s.inputElement}/>
						</div>
						<div className={s.element}>
							<b>Twitter: </b>
							<input id={'contacts.twitter'}
										 {...register('contacts.twitter')}
										 className={s.inputElement}/>
						</div>
						<div className={s.element}>
							<b>Website: </b>
							<input id={'contacts.website'}
										 {...register('contacts.website')}
										 className={s.inputElement}/>
						</div>
						<div className={s.element}>
							<b>YouTube: </b>
							<input id={'contacts.youtube'}
										 {...register('contacts.youtube')}
										 className={s.inputElement}/>
						</div>
						<div className={s.element}>
							<b>Main link: </b>
							<input id={'contacts.mainLink'}
										 {...register('contacts.mainLink')}
										 className={s.inputElement}/>
						</div>

					</div>
				</div>
				<button type={'submit'} className={s.buttonSaveProfile}>save</button>
			</form>
		</>
	)
};

