import React, {useEffect} from 'react';
import Preloader from '../../common/components/Preloader/Preloader';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {getUserProfile, getUserStatus} from './profileReducer';

export const Me = () => {
	const dispatch = useAppDispatch()

	const profile = useAppSelector(state => state.profilePage.profile)
	const id = useAppSelector(state => state.auth.id)
	const isAuth = useAppSelector(state => state.auth.isAuth)

	const {userId} = useParams()

	useEffect(() => {
		if (id) {
			dispatch(getUserProfile(id.toString()))
			dispatch(getUserStatus(id.toString()))
		}
	}, [dispatch, id])


	if (!isAuth) return <Navigate to={'/login'}/>
	if (!profile) return <Preloader/>

	return (
		<div>
			<ProfileInfo isOwner={!userId}/>
			<MyPosts/>
		</div>
	);
}


