import React from 'react';
import s from './MePost.module.css';
import likeIcon from '../../../../assets/like.png'
import commentIcon from '../../../../assets/msg.png'
import shareIcon from '../../../../assets/share.png'
import {Anonymous} from '../../../../common/utils/BigHeads';

type PostPropsType = {
	message: string
	likes: number
	name: string
	time: string
	comments: number
	shares: number
	photo: string
}

export const MePost: React.FC<PostPropsType> = ({message, likes, name, time, comments, shares, photo}) => {

	return (
		<div className={s.post}>
			<div className={s.headerPost}>
				{photo !== null
					? <img className={s.userLogoPost} src={photo} alt={'avatar'}/>
					: Anonymous()
				}
				<div className={s.dataPost}>
					<div className={s.userNamePost}>{name}</div>
					<div className={s.datePost}>{time}</div>
				</div>
				<div className={s.boxButtonsDots}>
					<div className={s.btnDotsPost}/>
					<div className={s.btnDotsPost}/>
					<div className={s.btnDotsPost}/>
				</div>

			</div>
			<div className={s.mainPost}>
				{message}
			</div>
			<div className={s.footerPost}>
				<div className={s.likesPost}>
					<img src={likeIcon} alt={'like'} height={'30px'} width={'30px'}/>
					<div className={s.likeCount}>{likes}</div>
				</div>
				<div className={s.commentsPost}>
					<img src={commentIcon} alt={'comments'} height={'30px'} width={'30px'}/>
					<div className={s.commentsCount}>{comments}</div>
				</div>
				<div className={s.sharePost}>
					<img src={shareIcon} alt={'shareIcon'} height={'30px'} width={'30px'}/>
					<div className={s.shareCount}>{shares}</div>
				</div>
			</div>

		</div>
	)
}

