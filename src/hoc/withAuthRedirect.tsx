import React, {ComponentType} from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppRootStateType} from "../redux/reduxStore";

type mapStateToPropsType = {
	isAuth: boolean
}
let mapStateToPropsRedirect = (state: AppRootStateType): mapStateToPropsType => {
	return {
		isAuth: state.auth['isAuth']
	}
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {

	function RedirectComponent(props: mapStateToPropsType) {
		let {isAuth, ...restProps} = props
		if (!isAuth) return <Navigate to="/login"/>
		return <Component {...restProps as T}/>
	}

	let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)

	return ConnectedAuthRedirectComponent
}