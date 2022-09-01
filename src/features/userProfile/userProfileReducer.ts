import { profileAPI } from '../../api/profileAPI'
import { changeAppStatus, setError } from '../../app/appReducer'
import { AppThunkType } from '../../app/store'
import { ProfileType } from '../meProfile/meProfileReducer'

//types
type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetUserStatusType = ReturnType<typeof setUserStatus>

export type ProfileActionsType = SetUserProfileType | SetUserStatusType

export type UserProfileStateType = {
  profile: ProfileType | null
  status: string
}

// initial state
let initialState = {
  profile: null,
  status: '',
}

//reducer
export const userProfileReducer = (
  state: UserProfileStateType = initialState,
  action: ProfileActionsType
): UserProfileStateType => {
  switch (action.type) {
    case 'USER/SET-USER-PROFILE':
      return {
        ...state,
        profile: action.payload.profile,
      }
    case 'USER/SET-USER-STATUS':
      return {
        ...state,
        status: action.payload.status,
      }
    default:
      return state
  }
}

//AC
export const setUserProfile = (profile: ProfileType) =>
  ({ type: 'USER/SET-USER-PROFILE', payload: { profile } } as const)
export const setUserStatus = (status: string) =>
  ({ type: 'USER/SET-USER-STATUS', payload: { status } } as const)

//TC
export const getUserProfile =
  (userId: string): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'))
    try {
      const response = await profileAPI.getUserProfile(userId)

      dispatch(setUserProfile(response.data))
    } catch (err: any) {
      dispatch(setError(err))
    } finally {
      dispatch(changeAppStatus('idle'))
    }
  }

export const getUserStatus =
  (userId: string): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'))
    try {
      const response = await profileAPI.getUserStatus(userId)

      dispatch(setUserStatus(response.data))
    } catch (err: any) {
      dispatch(setError(err))
    } finally {
      dispatch(changeAppStatus('idle'))
    }
  }
