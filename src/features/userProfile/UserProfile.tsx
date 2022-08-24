import React, {useEffect} from 'react';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {getUserProfile, getUserStatus} from './userProfileReducer';
import {Preloader} from '../../common/components/preloader/Preloader';
import {UserProfileInfo} from './userProfileInfo/UserProfileInfo';

export const UserProfile = () => {

	const dispatch = useAppDispatch()

	const profile = useAppSelector(state => state.userProfilePage.profile)
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const status = useAppSelector(state => state.app.status)

	const {userId} = useParams()

	useEffect(() => {
		if (userId) {
			dispatch(getUserProfile(userId))
			dispatch(getUserStatus(userId))
		}
	}, [dispatch, userId])

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>
	if (!userId && status === 'idle') return <Navigate to="/404"/>
	if (!profile) return <Preloader/>

	return (
		<div>
			<UserProfileInfo profile={profile} status={status}/>
		</div>
	);
}


