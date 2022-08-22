import React, {useEffect, useState} from 'react';
import s from './Pagination.module.css'
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {getUsers} from '../../../features/users/usersReducer';

export const Pagination = () => {

	const dispatch = useAppDispatch()
	const pageSize = useAppSelector(state => state.usersPage.pageSize)
	const currentPage = useAppSelector(state => state.usersPage.currentPage)
	const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)

	let pagesCount = Math.ceil(totalUsersCount / pageSize)
	let pages = []
	let numberOfPaginationElements = 20
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	const [portionNumber, setPortionNumber] = useState<number>(1)
	let leftPortionPageNumber = (portionNumber - 1) * numberOfPaginationElements + 1
	let rightPortionPageNumber = portionNumber * numberOfPaginationElements

	const forward = () => {
		if (portionNumber === Math.ceil(pagesCount / numberOfPaginationElements)) setPortionNumber(1)
		else setPortionNumber(portionNumber + 1)
	}
	const back = () => {
		if (portionNumber === 1) setPortionNumber(Math.ceil(pagesCount / numberOfPaginationElements))
		else setPortionNumber(portionNumber - 1)
	}

	const setPageHandler = (filteredPage: number) => {
		dispatch(getUsers(filteredPage, pageSize))
	}

	useEffect(() => {
		setPortionNumber(Math.ceil(currentPage / numberOfPaginationElements))
	}, [numberOfPaginationElements, currentPage])

	return (
		<>
			<button className={s.btnControl} onClick={back}> {'<<'} </button>
			{pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber).map(filteredPage => {
				return (
					<span
						key={filteredPage}
						onClick={() => setPageHandler(filteredPage)}
						className={currentPage === filteredPage ? s.pageNumberButton_active : s.pageNumberButton}>
                            {filteredPage}
                        </span>
				)
			})}
			<button className={s.btnControl} onClick={forward}> {'>>'} </button>
		</>
	)
}
