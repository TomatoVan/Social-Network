import React from 'react';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Navigate, useParams} from 'react-router-dom';
import {ProfileInfo} from './profileInfo/ProfileInfo';
import {MyPosts} from './myPosts/MyPosts';
import {Preloader} from '../../common/components/preloader/Preloader';

export const MyProfile = () => {

	const profile = useAppSelector(state => state.profilePage.profile)
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const status = useAppSelector(state => state.app.status)

	const {userId} = useParams()

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>
	if (!profile) return <Preloader/>

	return (
		<div>
			<ProfileInfo isOwner={!userId}/>
			<MyPosts/>
		</div>
	);
}


