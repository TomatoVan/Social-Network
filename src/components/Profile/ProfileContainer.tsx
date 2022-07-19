import React, {ComponentType} from 'react';
import s from './Profile.module.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileOnMount, getUserStatusOnMount, updateUserStatus} from "../../redux/profileReducer";
import {useMatch} from "react-router-dom";
import {AppRootStateType} from "../../redux/reduxStore";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


export type ProfileType = {
	aboutMe: string
	contacts: {
		[key: string]: string
	}
	fullName: string
	lookingForAJob: boolean
	lookingForAJobDescription: string
	photos: {
		large: string,
		small: string
	}
	userId: number
}

type MatchParams = {
	match: {
		params: {
			userId: string
		}
	}
}

type mapStateType = {
	profile: ProfileType,
	status: string
}
type mapDispatchType = {
	getUserProfileOnMount: (userId: string) => void,
	getUserStatusOnMount: (status: string) => void,
	updateUserStatus: (status: string) => void
}

export type ConnectPropsType = mapStateType & mapDispatchType
export type ProfilePropsType = ConnectPropsType & MatchParams

class ProfileContainer extends React.Component<ProfilePropsType> {

	componentDidMount() {
		let userId
		if (this.props.match !== null) {
			userId = this.props.match.params.userId

		}
		if (!userId) {
			userId = "22048"
		}

		this.props.getUserProfileOnMount(userId)
		this.props.getUserStatusOnMount(userId)
	}

	render() {
		return (
			<Profile {...this.props} />
		)
	}
}


export function withRouter<T>(Component: ComponentType<T>) {
	return function (props: any) {
		const match = useMatch('/profile/:userId/');
		return <Component {...props as T} match={match}/>
	}

}

let mapStateToProps = (state: AppRootStateType) => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status
	}
}


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// export default connect(mapStateToProps, {
// 	getProfileUserOnMount
// })(withRouter(AuthRedirectComponent));

export default compose<React.ComponentType>(
	connect(mapStateToProps, {getUserProfileOnMount, getUserStatusOnMount, updateUserStatus}),
	withRouter,
	withAuthRedirect
)(ProfileContainer)
