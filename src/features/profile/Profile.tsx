import React, {useEffect} from 'react';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {getUserProfile, getUserStatus} from './profileReducer';
import {Preloader} from '../../common/components/preloader/Preloader';
import {ProfileInfo} from './profileInfo/ProfileInfo';

export const Profile = () => {

	const dispatch = useAppDispatch()

	const profile = useAppSelector(state => state.profilePage.profile)
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
	if (!profile || status === 'loading') return <Preloader/>

	return (
		<div>
			<ProfileInfo isOwner={!userId}/>
		</div>
	);
}


