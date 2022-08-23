import React, {useState} from 'react';
import s from '../navbar/Navbar.module.css';
import {ItemMenu} from './ItemMenu';
import {RouteNames} from '../../enums/routes';
import HomeIcon from '../../../assets/home.png'
import profileIcon from '../../../assets/iconProfile.png'
import musicIcon from '../../../assets/musicIcon.png'
import messagesIcon from '../../../assets/msg.png'
import FriendsIcon from '../../../assets/people.png'
import SettingsIcon from '../../../assets/keypng.png'

export type statusPageActiveType = 'PROFILE' | 'MESSAGES' | 'MUSIC' | 'FRIENDS' | 'SETTINGS' | 'HOME' | 'ME'


export const Navbar = () => {

	const [activeItemMenu, setActiveItemMenu] = useState<string>('HOME')

	const changeStatusItemMenu = (pageActive: statusPageActiveType) => {
		switch (pageActive) {
			case 'PROFILE': {
				setActiveItemMenu('PROFILE')
				break;
			}
			case 'MESSAGES': {
				setActiveItemMenu('MESSAGES')
				break;
			}
			case 'MUSIC': {
				setActiveItemMenu('MUSIC')
				break;
			}
			case 'FRIENDS': {
				setActiveItemMenu('FRIENDS')
				break;
			}
			case 'SETTINGS': {
				setActiveItemMenu('SETTINGS')
				break;
			}
			case 'HOME': {
				setActiveItemMenu('HOME')
				break;
			}
			case 'ME': {
				setActiveItemMenu('ME')
				break;
			}
			default : {
				setActiveItemMenu('HOME')
				break;
			}
		}
		if (pageActive === 'PROFILE') setActiveItemMenu('PROFILE')
		else if (pageActive === 'MESSAGES') setActiveItemMenu('MESSAGES')
		else if (pageActive === 'MUSIC') setActiveItemMenu('MUSIC')
		else if (pageActive === 'FRIENDS') setActiveItemMenu('FRIENDS')
		else if (pageActive === 'SETTINGS') setActiveItemMenu('SETTINGS')
		else if (pageActive === 'HOME') setActiveItemMenu('HOME')
		else if (pageActive === 'ME') setActiveItemMenu('ME')
	}

	return (
		<div className={s.leftSideBar}>
			<ItemMenu name={'HOME'}
								changeStatusItemMenu={changeStatusItemMenu}
								img={HomeIcon}
								activeItemMenu={activeItemMenu}
								link={'/'}
								title={'Home'}/>
			<ItemMenu name={'ME'}
								title={'My profile'}
								changeStatusItemMenu={changeStatusItemMenu}
								img={profileIcon}
								activeItemMenu={activeItemMenu}
								link={RouteNames.ME}/>
			<ItemMenu name={'MESSAGES'}
								title={'Messages'}
								changeStatusItemMenu={changeStatusItemMenu}
								img={messagesIcon}
								activeItemMenu={activeItemMenu}
								link={RouteNames.MESSAGES}/>
			<ItemMenu name={'FRIENDS'}
								title={'Friends'}
								changeStatusItemMenu={changeStatusItemMenu}
								img={FriendsIcon}
								activeItemMenu={activeItemMenu}
								link={RouteNames.FRIENDS}/>
			<ItemMenu name={'MUSIC'}
								title={'Music'}
								changeStatusItemMenu={changeStatusItemMenu}
								img={musicIcon}
								activeItemMenu={activeItemMenu}
								link={RouteNames.MUSIC}/>
			<ItemMenu name={'SETTINGS'}
								title={'Settings'}
								changeStatusItemMenu={changeStatusItemMenu}
								img={SettingsIcon}
								activeItemMenu={activeItemMenu}
								link={RouteNames.SETTINGS}/>
		</div>
	)
};

