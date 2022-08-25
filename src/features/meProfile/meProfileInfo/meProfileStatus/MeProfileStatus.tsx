import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {updateMyStatus} from '../../meProfileReducer';
import s from './MeProfileStatus.module.css';


export const MeProfileStatus: FC<{ status: string }> = ({status}) => {

	const dispatch = useAppDispatch()

	const [editMode, setEditMode] = useState(false)
	const [statusText, setStatusText] = useState(status)

	useEffect(() => {
		setStatusText(status)
	}, [status])

	const changeEditMode = () => setEditMode(true)
	const updateStatusHandler = () => {
		setEditMode(false)
		dispatch(updateMyStatus(statusText))
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setStatusText(e.currentTarget.value)

	return (
		<>
			{!editMode && <span className={s.userSlogan}>{statusText}</span>}
			{editMode
				&& <>
						<input className={s.editStatusInput}
									 value={statusText}
									 onChange={e => onChangeHandler(e)}/>
						<button className={s.setStatusButton} onClick={updateStatusHandler}>save</button>
					</>}
			{!editMode && <button onClick={changeEditMode} className={s.setStatusButton}>Edit status</button>}
		</>
	)


};

