import {connect} from "react-redux";
import {setFollowing, setCurrentPage, setFetching, setTotalUsersCount, setUsers} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";

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

interface IRecipeProps {
	users: any,
	setUsers: (users: any) => void,
	setCurrentPage: (CurrentPage: number) => void,
	setFollowing: (userId: number) => void,
	setTotalUsersCount: (totalCount: number) => void,
	setFetching: (isFetching: boolean) => void,
	pageSize: number,
	totalUsersCount: number,
	currentPage: number,
	isFetching: boolean
}

interface IRecipeState {
}

class UsersContainer extends React.Component<IRecipeProps, IRecipeState> {

	componentDidMount() {
		this.props.setFetching(true)
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.setFetching(false)
				this.props.setUsers(response.data.items);
				this.props.setTotalUsersCount(response.data.totalCount)
			})
	}

	onPageChange = (pageNumber: number) => {
		this.props.setFetching(true)
		this.props.setCurrentPage(pageNumber)
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.setFetching(false);
				this.props.setUsers(response.data.items);
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
				/>
				: null}

		</>
	}
}

const mapStateToProps = (state: { usersPage: { users: stateType, pageSize: number, totalUsersCount: number, currentPage: number, isFetching: boolean } }) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching
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
})(UsersContainer)

