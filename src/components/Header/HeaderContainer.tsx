import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getUserAuthDataOnMount} from "../../redux/authReducer";

type mapStateType = {
	isAuth: boolean,
	login: string
}
type mapDispatchType = {
	getUserAuthDataOnMount: () => void
}

export type MapStatePropsType = mapStateType & mapDispatchType

class HeaderContainer extends React.Component<MapStatePropsType> {

	componentDidMount() {
		this.props.getUserAuthDataOnMount()

	}

	render() {
		return <Header {...this.props}/>
	}

}

const mapStateToProps = (state: any) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
})

export default connect(mapStateToProps, {
	getUserAuthDataOnMount
})(HeaderContainer);
