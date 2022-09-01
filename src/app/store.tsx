import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'

import { DialogActionsType, dialogsReducer } from '../features/dialogs/dialogsReducer'
import { authReducer, AuthUserActionsType } from '../features/login/authReducer'
import { MeProfileActionsType, meProfileReducer } from '../features/meProfile/meProfileReducer'
import { ProfileActionsType, userProfileReducer } from '../features/userProfile/userProfileReducer'
import { UsersActionsType, usersReducer } from '../features/users/usersReducer'

import { AppActionsTypes, appReducer } from './appReducer'

let rootReducer = combineReducers({
  userProfilePage: userProfileReducer,
  meProfilePage: meProfileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllAppActionsType =
  | AuthUserActionsType
  | AppActionsTypes
  | DialogActionsType
  | ProfileActionsType
  | UsersActionsType
  | MeProfileActionsType
export type AppThunkType = ThunkAction<void, AppRootStateType, unknown, AllAppActionsType>

//for dev
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// export let store = createStore(rootReducer, applyMiddleware(thunk))
