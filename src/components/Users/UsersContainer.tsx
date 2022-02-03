import {connect} from "react-redux";
import Users from "./Users";
import {followAC, GeneralType, setUsersAC} from "../../redux/users-reducer";

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

const mapStateToProps = (state: { usersPage: { users: stateType } }) => {
	return {
		users: state.usersPage.users
	}
}

const mapDispatchToProps = (dispatch: (action: GeneralType) => void) => {

	return {
		changeFollow: (userId: number) => {
			dispatch(followAC(userId))
		},
		setUsers: (users: any) => {
			dispatch(setUsersAC(users))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)

