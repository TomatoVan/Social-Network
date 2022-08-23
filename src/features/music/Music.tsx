import React from 'react';
import {Navigate} from 'react-router-dom';
import {Preloader} from '../../common/components/preloader/Preloader';
import {useAppSelector} from '../../common/hooks/useAppSelector';

export const Music = () => {

	const isAuth = useAppSelector(state => state.auth.isAuth)
	const status = useAppSelector(state => state.app.status)

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>
	if (status === 'loading') return <Preloader/>

	return (
		<div>
			Music
		</div>

	)
}

