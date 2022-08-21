import React, {ComponentType} from 'react';
import s from './Profile.module.css';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfileOnMount, getUserStatusOnMount, savePhoto, updateUserStatus} from './profileReducer';
import {useMatch} from 'react-router-dom';
import {AppRootStateType} from '../../app/store';
import {compose} from 'redux';
import {withAuthRedirect} from '../../common/components/AuthRedirect/withAuthRedirect';


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
	savePhoto: any
}

export type ConnectPropsType = mapStateType & mapDispatchType
export type ProfilePropsType = ConnectPropsType & MatchParams

class ProfileContainer extends React.Component<ProfilePropsType> {

	refreshProfile() {
		let userId
		if (this.props.match !== null) {
			userId = this.props.match.params.userId

		}
		if (!userId) {
			userId = '22048'
		}

		this.props.getUserProfileOnMount(userId)
		this.props.getUserStatusOnMount(userId)
	}

	componentDidMount() {
		this.refreshProfile()
	}

	// componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<{}>, snapshot?: any) {
	// 	if (prevProps.match.params.userId) {
	//
	// 		if (this.props.match.params.userId !== prevProps.match.params.userId)
	// 			this.refreshProfile()
	// 	}
	//
	// }


	render() {
		return (
			<Profile {...this.props} isOwner={!this.props.match}/>
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
	connect(mapStateToProps, {getUserProfileOnMount, getUserStatusOnMount, updateUserStatus, savePhoto}),
	withRouter,
	withAuthRedirect
)(ProfileContainer)
