import React, {useEffect} from 'react';
import './App.module.css';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {Header} from '../features/header/Header';
import {getAuthUserData} from '../features/login/authReducer';
import {ErrorSnackBar} from '../common/components/snackbars/ErrorSnackbar';
import s from './App.module.css'
import {Navbar} from '../common/components/navbar/Navbar';
import {Main} from '../features/main/Main';
import {getUserProfile, getUserStatus} from '../features/profile/profileReducer';
import {useNavigate} from 'react-router-dom';

export const App = () => {

	const dispatch = useAppDispatch()
	const id = useAppSelector(state => state.auth.id)
	//navigate to home after page refresh if on different page
	const navigate = useNavigate()

	useEffect(() => {
		if (id) {
			dispatch(getUserProfile(id.toString()))
			dispatch(getUserStatus(id.toString()))
		}
	}, [dispatch, id])

	useEffect(() => {
		dispatch(getAuthUserData())
		navigate('/')
	}, [dispatch])

	return (
		<div className={s.app}>
			<Header/>
			<div className={s.flexMain}>
				<Navbar/>
				<Main/>
			</div>
			<ErrorSnackBar/>
		</div>
	);
}




