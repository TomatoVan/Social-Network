import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { AllAppActionsType, AppRootStateType } from '../../app/store'

//dispatch typification
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>
export const useAppDispatch = () => useDispatch<ThunkDispatchType>()
