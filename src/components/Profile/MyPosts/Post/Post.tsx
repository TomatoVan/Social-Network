import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
	message:string,
	likes:string;
}

const Post = (props:PostPropsType) => {
	return(
		<div className = {s.item}>
			<img src='https://img2.freepng.ru/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg' alt='post ava' />
			{props.message}
			<div>
				<span>Like</span> {props.likes}
			</div>

		</div>
	);


}

export default Post;