import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/authReducer";
import {usersAPI} from "../../api/Api";

type mapStateType = {
	isAuth: boolean,
	login: string
}
type mapDispatchType = {
	setAuthUserData: (id: number, email: string, login: string) => void
}

export type MapStatePropsType = mapStateType & mapDispatchType

class HeaderContainer extends React.Component<MapStatePropsType> {

	componentDidMount() {
		usersAPI.getUserAuthData().then(data => {
			if (data.resultCode === 0) {
				let {id, email, login} = data.data
				this.props.setAuthUserData(id, email, login)

			}
		})

	}

	render() {
		return <Header {...this.props}/>
	}

}

const mapStateToProps = (state: any) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
