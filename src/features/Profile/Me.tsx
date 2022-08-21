import React, {useEffect} from 'react';
import Preloader from '../../common/components/Preloader/Preloader';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {getUserProfile, getUserStatus} from './profileReducer';

export const Me = () => {
	const dispatch = useAppDispatch()

	const profile = useAppSelector(state => state.profilePage.profile)
	const id = useAppSelector(state => state.auth.id)

	const {userId} = useParams()

	useEffect(() => {
		if (userId) {
			dispatch(getUserProfile(userId))
			dispatch(getUserStatus(userId))
		} else if (id) {
			dispatch(getUserProfile(id.toString()))
			dispatch(getUserStatus(id.toString()))
		}

	}, [dispatch, id, userId])

	if (!profile) {
		return <Preloader/>
	}

	return (
		<div>
			<ProfileInfo isOwner={!userId}/>
			<MyPosts/>
		</div>
	);
}


