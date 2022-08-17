import {connect} from 'react-redux';
import {
	getUsersOnMount,
	getUsersOnChange, follow, unFollow, userType
} from './usersReducer';
import React from 'react';
import Users from './Users';
import Preloader from '../../common/components/Preloader/Preloader';
import {AppRootStateType} from '../../app/store';

type userContainerPropsType = {
	users: Array<userType>,
	pageSize: number,
	totalUsersCount: number,
	currentPage: number,
	isFetching: boolean,
	inProgress: Array<number>,
	getUsersOnMount: (currentPage: number, pageSize: number) => void
	getUsersOnChange: (currentPage: number, pageSize: number) => void,
	follow: (userId: number) => void,
	unFollow: (userId: number) => void
}


class UsersContainer extends React.Component<userContainerPropsType> {

	componentDidMount() {
		this.props.getUsersOnMount(this.props.currentPage, this.props.pageSize);
	}

	onPageChange = (pageNumber: number) => {
		this.props.getUsersOnChange(pageNumber, this.props.pageSize);
	}

	render() {
		return <>
			{this.props.isFetching ? <Preloader/> : null}
			{!this.props.isFetching
				? <Users users={this.props.users}
								 currentPage={this.props.currentPage}
								 totalUsersCount={this.props.totalUsersCount}
								 pageSize={this.props.pageSize}
								 onPageChange={this.onPageChange}
								 inProgress={this.props.inProgress}
								 follow={this.props.follow}
								 unFollow={this.props.unFollow}
				/>
				: null}

		</>
	}
}

const mapStateToProps = (state: AppRootStateType) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		inProgress: state.usersPage.inProgress
	}
}

export default connect(mapStateToProps, {
	getUsersOnMount,
	getUsersOnChange,
	follow,
	unFollow
})(UsersContainer)

