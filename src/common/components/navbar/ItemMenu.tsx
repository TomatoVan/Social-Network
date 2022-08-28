import s from './Navbar.module.css';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {statusPageActiveType} from './Navbar';

type PropsType = {
	changeStatusItemMenu: (value: statusPageActiveType) => void
	img: string
	name: statusPageActiveType
	activeItemMenu: string
	link: string
	title: string
}

export const ItemMenu: FC<PropsType> = React.memo(({title, name, changeStatusItemMenu, activeItemMenu, img, link}) => {
	return (
		<Link className={activeItemMenu === name ? s.menuItem_active : s.menuItem}
					onClick={() => changeStatusItemMenu(name)}
					to={link}>
			<img src={img} height="50px" width="50px" alt={'itemMenu'}/>
			{title}
			{activeItemMenu === name ?
				<div className={s.boxVerticalLine_active}>
					<div className={s.verticalLine_active}/>
				</div> : <div/>
			}
		</Link>
	)
})