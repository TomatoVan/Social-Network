import React, {ComponentType} from 'react';
import {useMatch} from 'react-router-dom';

export function withRouter<T>(Component: ComponentType<T>) {
	return function (props: any) {
		const match = useMatch('/profile/:userId');
		return <Component {...props as T} match={match}/>
	}

}