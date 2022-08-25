import React from 'react';
import s from './MePosts.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {addMyPost} from '../meProfileReducer';
import {MePost} from './mePost/MePost';

type FormTypes = {
	message: string,
};

export const MePosts = () => {

	const dispatch = useAppDispatch()
	const postsData = useAppSelector(state => state.meProfilePage.postsData)
	const mePhoto = useAppSelector(state => state.meProfilePage.profile.photos.small)
	const name = useAppSelector(state => state.meProfilePage.profile.fullName)

	const time = `${new Date().getHours()}:${new Date().getMinutes()}`

	let postsElements = postsData.map((p) => <MePost key={p.id} message={p.message} likes={p.likes} name={name} time={time} comments={p.comments} shares={p.shares} photo={mePhoto}/>)

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm<FormTypes>({mode: 'onSubmit'});
	const onSubmit: SubmitHandler<FormTypes> = (data) => {
		reset();

		dispatch(addMyPost(data.message))
	};

	return (
		<div className={s.boxPosts}>
			<div className={s.boxPostsTitle}>
				<div className={s.createPostBox}>
					<div className={s.createPostTitle}>Create post:</div>
					<div className={s.createPost}>
						<form onSubmit={handleSubmit(onSubmit)} className={s.postsForm}>
							<div>
								<textarea className={s.postTextField} {...register('message', {required: 'The field is required'})} placeholder="Message"/>
								<div>
									{errors?.message && <p className={s.error}>{errors?.message?.message || 'Error!'}</p>}
								</div>
							</div>
							<div>
								<input className={s.submitBtn} type="submit" value="Add post"/>
							</div>
						</form>
					</div>
				</div>
				<div className={s.myPostsBox}>
					<div className={s.myPostsTitle}>My posts:</div>
					{postsElements}
				</div>
			</div>
		</div>
	);
}


