import React, {useEffect} from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {getUserProfile, getUserStatus} from './profileReducer';
import {Preloader} from '../../common/components/Preloader/Preloader';

export const Me = () => {
	const dispatch = useAppDispatch()

	const profile = useAppSelector(state => state.profilePage.profile)
	const id = useAppSelector(state => state.auth.id)
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const status = useAppSelector(state => state.app.status)
	const navigate = useNavigate()

	const {userId} = useParams()

	useEffect(() => {
		if (id) {
			dispatch(getUserProfile(id.toString()))
			dispatch(getUserStatus(id.toString()))
		}
	}, [dispatch, id])

	useEffect(() => {
		if (!isAuth && status === 'idle') navigate('/login')
	}, [isAuth, status])


	if (!profile) return <Preloader/>

	return (
		<div>
			<ProfileInfo isOwner={!userId}/>
			<MyPosts/>
		</div>
	);
}


