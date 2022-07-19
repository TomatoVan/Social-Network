import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

type mapStateType = {
	isAuth: boolean
	login: string | null
}
type mapDispatchType = {
	logout: () => void
}

export type ConnectPropsType = mapStateType & mapDispatchType

class HeaderContainer extends React.Component<ConnectPropsType> {


	render() {
		return <Header {...this.props}/>
	}

}

const mapStateToProps = (state: AppStateType): mapStateType => ({
	isAuth: state.auth['isAuth'],
	login: state.auth['login']
})

export default connect(mapStateToProps, {
	logout
})(HeaderContainer);
