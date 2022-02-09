import {connect} from "react-redux";
import Users from "./Users";
import {followAC, GeneralType, setCurrentPageAC, setTotalUsersCountAC, setUsersAC} from "../../redux/users-reducer";

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

export default connect(mapStateToProps, mapDispatchToProps)(Users)

