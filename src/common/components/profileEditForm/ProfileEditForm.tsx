import React from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ProfileType} from '../../../features/meProfile/meProfileReducer';
import s from './ProfileEditForm.module.css'
import {Navigate} from 'react-router-dom';

export const ProfileEditForm = () => {

	const isAuth = useAppSelector(state => state.auth.isAuth)
	const status = useAppSelector(state => state.app.status)
	const profile = useAppSelector(state => state.meProfilePage.profile)

	const {
		register,
		handleSubmit,
		reset,
	} = useForm<ProfileType>({
		mode: 'onSubmit',
		defaultValues: {
			userId: profile.userId,
			lookingForAJob: profile.lookingForAJob,
			lookingForAJobDescription: profile.lookingForAJobDescription,
			fullName: profile.fullName,
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
		// dispatch(saveProfile(loginData, setError))
		console.log(profileData)
		reset()
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

