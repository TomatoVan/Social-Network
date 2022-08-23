import React from 'react';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Navigate} from 'react-router-dom';
import {Preloader} from '../../common/components/preloader/Preloader';

export const Settings = () => {
	
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const status = useAppSelector(state => state.app.status)

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>
	if (status === 'loading') return <Preloader/>
	return (
		<div>
			Settings
		</div>

	)
}

