import React, {useEffect} from 'react';
import Preloader from '../../common/components/Preloader/Preloader';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {getUserProfile, getUserStatus} from './profileReducer';

export const Profile = () => {
	const dispatch = useAppDispatch()

	const profile = useAppSelector(state => state.profilePage.profile)

	const {userId} = useParams()

	useEffect(() => {
		if (userId) {
			dispatch(getUserProfile(userId))
			dispatch(getUserStatus(userId))
		}

	}, [dispatch, userId])

	if (!profile) {
		return <Preloader/>
	}

	return (
		<div>
			<ProfileInfo isOwner={!userId}/>
		</div>
	);
}


