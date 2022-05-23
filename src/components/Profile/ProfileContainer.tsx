import React from 'react';
import s from './Profile.module.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileOnMount, getUserStatusOnMount, profileType, updateUserStatus} from "../../redux/profileReducer";
import {useMatch} from "react-router-dom";
import {AppStateType} from "../../redux/reduxStore";
import {compose} from "redux";

type MatchParams = {
	match: {
		params: {
			userId: string
		}
	}
}

type mapStateType = {
	profile: profileType,
	isAuth: boolean,
	status: any
}
type mapDispatchType = {
	getUserProfileOnMount: (userId: string) => void,
	getUserStatusOnMount: (status: string) => void,
	updateUserStatus: (status: string) => void
}

export type MapStatePropsType = mapStateType & mapDispatchType

class ProfileContainer extends React.Component<MapStatePropsType & MatchParams> {

	componentDidMount() {
		let userId
		if (this.props.match !== null) {
			userId = this.props.match.params.userId
		}
		if (!userId) {
			userId = String(2)
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


export const withRouter = (Component: any) => {
	return (props: any) => {
		const match = useMatch('/profile/:userId/');
		return <Component {...props} match={match}/>;
	};
}

let mapStateToProps = (state: AppStateType) => {
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
	// withAuthRedirect
)(ProfileContainer)
