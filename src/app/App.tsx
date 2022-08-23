import React, {useEffect} from 'react';
import './App.module.css';
import {Navigate} from 'react-router-dom';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {Header} from '../features/header/Header';
import {getAuthUserData} from '../features/login/authReducer';
import {ErrorSnackBar} from '../common/components/snackbars/ErrorSnackbar';
import s from './App.module.css'
import {Navbar} from '../common/components/navbar/Navbar';
import {Main} from '../features/main/Main';

export const App = () => {

	const dispatch = useAppDispatch()
	const initialized = useAppSelector(state => state.app.initialized)
	const status = useAppSelector(state => state.app.status)

	useEffect(() => {
		dispatch(getAuthUserData())
	}, [dispatch])


	if (!initialized && status === 'idle') return <Navigate to={'/login'}/>

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




