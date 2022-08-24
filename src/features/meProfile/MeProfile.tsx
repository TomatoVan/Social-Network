import React from 'react';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Navigate, useParams} from 'react-router-dom';
import {Preloader} from '../../common/components/preloader/Preloader';
import {MeProfileInfo} from './meProfileInfo/MeProfileInfo';
import {MePosts} from './mePosts/MePosts';

export const MeProfile = () => {

	const profile = useAppSelector(state => state.meProfilePage.profile)
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const status = useAppSelector(state => state.app.status)

	const {userId} = useParams()

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>
	if (!profile) return <Preloader/>

	return (
		<div>
			<MeProfileInfo isOwner={!userId}/>
			<MePosts/>
		</div>
	);
}


