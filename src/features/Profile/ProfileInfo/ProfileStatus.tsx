import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusType = {
	status: string,
	updateUserStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusType) => {


	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(props.status)

	useEffect(() => {
		setStatus(props.status)
	}, [props.status])

	const onDoubleClickHandler = () => setEditMode(true)
	const onBlurHandler = () => {
		setEditMode(false)
		props.updateUserStatus(status)
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)

	return (
		<div>
			{!editMode
				? <div>
					<span onDoubleClick={onDoubleClickHandler}>{props.status || 'No status'}</span>
				</div>
				: <div>
					<input onChange={onChangeHandler} onBlur={onBlurHandler} value={status} autoFocus/>
				</div>}
		</div>
	)


};

