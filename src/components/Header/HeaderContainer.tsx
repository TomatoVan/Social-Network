import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getUserAuthDataOnMount, logout} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

type mapStateType = {
	isAuth: boolean
	login: string | null
}
type mapDispatchType = {
	getUserAuthDataOnMount: () => void
	logout: () => void
}

export type ConnectPropsType = mapStateType & mapDispatchType

class HeaderContainer extends React.Component<ConnectPropsType> {

	componentDidMount() {
		this.props.getUserAuthDataOnMount()
	}

	render() {
		return <Header {...this.props}/>
	}

}

const mapStateToProps = (state: AppStateType): mapStateType => ({
	isAuth: state.auth['isAuth'],
	login: state.auth['login']
})

export default connect(mapStateToProps, {
	getUserAuthDataOnMount, logout
})(HeaderContainer);
