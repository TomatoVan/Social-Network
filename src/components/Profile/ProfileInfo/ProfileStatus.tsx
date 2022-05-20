import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
	status: string
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

	state = {
		editMode: false
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
	}

	/*	onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

		}*/

	render() {

		return (
			<div>
				{!this.state.editMode
					? <div>
						<span onDoubleClick={this.onDoubleClickHandler}>{this.props.status}</span>
					</div>
					: <div>
						<input onBlur={this.onBlurHandler} value={this.props.status} autoFocus/>
					</div>}
			</div>
		)
	}


};

