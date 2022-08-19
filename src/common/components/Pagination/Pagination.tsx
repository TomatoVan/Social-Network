import React, {memo, useEffect, useState} from 'react';
import s from './Pagination.module.css'

type PropsType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	setCurrentPageHandler: (currentPage: number) => void
}

export const Pagination = memo((props: PropsType) => {

		let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
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

		useEffect(() => {
			setPortionNumber(Math.ceil(props.currentPage / numberOfPaginationElements))
		}, [numberOfPaginationElements, props.currentPage])

		return (
			<>
				<button className={s.btnControl} onClick={back}> {'<<'} </button>
				{pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
					return (
						<span
							key={p}
							onClick={() => {
								props.setCurrentPageHandler(p)
							}}
							className={props.currentPage === p ? s.pageNumberButton_active : s.pageNumberButton}>
                            {p}
                        </span>
					)
				})}
				<button className={s.btnControl} onClick={forward}> {'>>'} </button>
			</>
		)
	}
)