import React, {FC} from 'react';
import s from './CardUsers.module.css';
import {Link} from 'react-router-dom';
import userPhoto from '../../../assets/images/1.png';
import {setFollow} from '../../../features/users/usersReducer';
import {useAppDispatch} from '../../hooks/useAppDispatch';

// types
type CardUserPropsType = {
	// api
	name: string
	id: number
	uniqueUrlName: string | null
	photos: photoType
	status: string | null
	followed: boolean
	followingInProgress: Array<number>
	countryUser?: string | null
	cityUser?: string | null
}
type photoType = {
	small: string | null
	large: string | null
}

export const CardUsers: FC<CardUserPropsType> = (
	{
		cityUser,
		countryUser,
		followingInProgress,
		followed,
		status,
		id,
		uniqueUrlName,
		name,
		photos,
		children
	}) => {

	const dispatch = useAppDispatch()

	const followingHandler = (id: number, followed: boolean) => {
		dispatch(setFollow(id, followed))
	}

	return (
		<div className={s.cardUser} key={id}>
			<div className={s.userLogo}>
				<Link to={'/profile/' + id}>
					<img src={photos.small !== null ? photos.small : userPhoto} alt={''} className={s.userLogoAvatar}/>
				</Link>
			</div>
			<div className={s.userInformText}>
				<h3 className={s.userName}>{name}</h3>
				<h5 className={s.userCountry}>{countryUser} {cityUser}</h5>
			</div>
			<div className={s.userInformText2}>
				<p className={s.userPhrase}>{status}</p>
			</div>
			<button className={followed ? s.followButton_FALSE : s.followButton_TRUE} disabled={followingInProgress.some(elem => elem === id)}
							onClick={() => followingHandler(id, followed)}>
				{followed ? '-' : '+'}
			</button>
		</div>
	);
};

