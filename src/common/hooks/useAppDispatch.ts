import {useDispatch} from 'react-redux';
import {AllAppActionsType, AppRootStateType} from '../../app/store';
import {ThunkDispatch} from 'redux-thunk';

//dispatch typification
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>;
export const useAppDispatch = () => useDispatch<ThunkDispatchType>();