import {connect} from "react-redux";
import {followAC, GeneralType, setCurrentPageAC, setTotalUsersCountAC, setUsersAC} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";

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

const mapStateToProps = (state: { usersPage: { users: stateType, pageSize: number, totalUsersCount: number, currentPage: number } }) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage
	}
}

interface IRecipeProps {
	users: any,
	setUsers: (users: any) => void,
	setCurrentPage: (CurrentPage: number) => void,
	changeFollow: (userId: number) => void,
	setTotalUsersCount: (totalCount: number) => void,
	pageSize: number,
	totalUsersCount: number,
	currentPage: number
}

interface IRecipeState {
}

class UsersAPIComponent extends React.Component<IRecipeProps, IRecipeState> {

	componentDidMount() {
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.setUsers(response.data.items);
				this.props.setTotalUsersCount(51)
			})
	}

	onPageChange = (pageNumber: number) => {
		this.props.setCurrentPage(pageNumber)
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
			.then(response => this.props.setUsers(response.data.items))
	}

	render() {
		return <Users users={this.props.users}
					  changeFollow={this.props.changeFollow}
					  currentPage={this.props.currentPage}
					  totalUsersCount={this.props.totalUsersCount}
					  pageSize={this.props.pageSize}
					  onPageChange={this.onPageChange}
		/>
	}
}

const mapDispatchToProps = (dispatch: (action: GeneralType) => void) => {

	return {
		changeFollow: (userId: number) => {
			dispatch(followAC(userId))
		},
		setUsers: (users: any) => {
			dispatch(setUsersAC(users))
		},
		setCurrentPage: (currentPage: number) => {
			dispatch(setCurrentPageAC(currentPage))
		},
		setTotalUsersCount: (totalCount: number) => {
			dispatch(setTotalUsersCountAC(totalCount))
		}

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)

