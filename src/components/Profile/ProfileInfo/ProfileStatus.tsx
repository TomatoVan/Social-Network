import React, {ChangeEvent} from 'react';
import {updateUserStatus} from "../../../redux/profileReducer";

type ProfileStatusType = {
	status: string,
	updateUserStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

	state = {
		editMode: false,
		status: this.props.status
	}

	onDoubleClickHandler = () => {
		this.setState({
			editMode: true
		})
	}
	onBlurHandler = () => {
		this.setState({
			editMode: false
		})
		this.props.updateUserStatus(this.state.status)
	}

	onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			status: e.currentTarget.value
		})
	}

	componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>) { // if this.props.getUserProfileOnMount(userId) came first(for local state update, because it updates only when mount)
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status
			})
		}
	}

	render() {

		return (
			<div>
				{!this.state.editMode
					? <div>
						<span onDoubleClick={this.onDoubleClickHandler}>{this.props.status || "No status"}</span>
					</div>
					: <div>
						<input onChange={this.onChangeHandler} onBlur={this.onBlurHandler} value={this.state.status} autoFocus/>
					</div>}
			</div>
		)
	}


};

