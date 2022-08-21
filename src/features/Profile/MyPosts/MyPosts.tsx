import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {addPost} from '../profileReducer';

type FormTypes = {
	message: string,
};

export const MyPosts = () => {

	const dispatch = useAppDispatch()
	const postsData = useAppSelector(state => state.profilePage.postsData)


	let postsElements = postsData.map((p) => <Post key={p.id} message={p.message} likes={p.likes}/>)

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm<FormTypes>({mode: 'onSubmit'});
	const onSubmit: SubmitHandler<FormTypes> = (data) => {
		reset();

		dispatch(addPost(data.message))
	};

	return (<div className={s.postsBlock}>
		<h3>My posts</h3>
		<div>
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
		<div className={s.posts}>
			{postsElements}
		</div>
	</div>);
}

