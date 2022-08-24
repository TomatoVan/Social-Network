import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {updateMyStatus} from '../meProfileReducer';


export const MeProfileStatus: FC<{ isOwner: boolean }> = ({isOwner}) => {

	const dispatch = useAppDispatch()
	const initStatus = useAppSelector(state => state.meProfilePage.status)


	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(initStatus)

	useEffect(() => {
		setStatus(initStatus)
	}, [initStatus])

	const onDoubleClickHandler = () => setEditMode(true)
	const onBlurHandler = () => {
		setEditMode(false)
		dispatch(updateMyStatus(status))
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)

	return (
		<div>
			{!isOwner && <div>you cant change status</div>}
			{!editMode
				? <div>
					<span onDoubleClick={onDoubleClickHandler}>{status || 'No status'}</span>
				</div>
				: <div>
					<input onChange={onChangeHandler} onBlur={onBlurHandler} value={status} autoFocus disabled={!isOwner}/>
				</div>}
		</div>
	)


};

