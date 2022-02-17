import {connect} from "react-redux";
import {setFollowing, setCurrentPage, setFetching, setTotalUsersCount, setUsers, setInProgress} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {usersAPI} from "../../api/Api";

type stateType = {
	id: number,
	photoUrl: string,
	followed: boolean,
	fullName: string,
	status: string,
	location: {
		city: string,
		country: string
	}
}

type userPageType = {
	usersPage: {
		users: stateType,
		pageSize: number,
		totalUsersCount: number,
		currentPage: number,
		isFetching: boolean,
		inProgress: Array<number>
	}
}

type userContainerPropsType = {
	users: any,
	setUsers: (users: any) => void,
	setCurrentPage: (CurrentPage: number) => void,
	setFollowing: (userId: number) => void,
	setTotalUsersCount: (totalCount: number) => void,
	setFetching: (isFetching: boolean) => void,
	setInProgress: (isFetching: boolean, userId: number) => void,
	pageSize: number,
	totalUsersCount: number,
	currentPage: number,
	isFetching: boolean,
	inProgress: Array<number>
}


class UsersContainer extends React.Component<userContainerPropsType> {

	componentDidMount() {
		this.props.setFetching(true)
		usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
			this.props.setFetching(false)
			this.props.setUsers(data.items);
			this.props.setTotalUsersCount(data.totalCount)
		})
	}

	onPageChange = (pageNumber: number) => {
		this.props.setFetching(true)
		this.props.setCurrentPage(pageNumber)
		usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
			this.props.setFetching(false);
			this.props.setUsers(data.items);
		})
	}

	render() {
		return <>
			{this.props.isFetching ? <Preloader/> : null}
			{!this.props.isFetching
				? <Users users={this.props.users}
						 setFollowing={this.props.setFollowing}
						 currentPage={this.props.currentPage}
						 totalUsersCount={this.props.totalUsersCount}
						 pageSize={this.props.pageSize}
						 onPageChange={this.onPageChange}
						 setInProgress={this.props.setInProgress}
						 inProgress={this.props.inProgress}
				/>
				: null}

		</>
	}
}

const mapStateToProps = (state: userPageType) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		inProgress: state.usersPage.inProgress
	}
}

/*const mapDispatchToProps = (dispatch: (action: GeneralType) => void) => {

	return {
		setFollowing: (userId: number) => {
			dispatch(setFollowing(userId))
		},
		setUsers: (users: any) => {
			dispatch(setUsers(users))
		},
		setCurrentPage: (currentPage: number) => {
			dispatch(setCurrentPage(currentPage))
		},
		setTotalUsersCount: (totalCount: number) => {
			dispatch(setTotalUsersCount(totalCount))
		},
		setFetching: (isFetching: boolean) => {
			dispatch(setFetching(isFetching))
		},

	}
}*/

export default connect(mapStateToProps, {
	setFollowing,
	setUsers,
	setCurrentPage,
	setTotalUsersCount,
	setFetching,
	setInProgress
})(UsersContainer)

