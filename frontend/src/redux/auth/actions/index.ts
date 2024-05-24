
import ApiServiceSingleton from '../../../services/ApiService'
import { loggedUser } from '../../../utils/types/authModel'
import * as t from '../types'

export type loginFormType = {
  email: string
  password: string
}

export const doLogin =
  ({ email, password }: loginFormType) =>
  (dispatch: any) => {
    dispatch({ type: t.AUTH_FETCHING })
    ApiServiceSingleton.doLogin(email, password)
      .then((res) => {
        if (res) {
          const result = res as loggedUser
          if (result.token) ApiServiceSingleton.setToken(result.token)
          dispatch({ type: t.AUTH_FETCH, payload: { ...result } })
        } else dispatch({ type: t.AUTH_FETCH_ERROR, payload: 'Not User Found' })
      })
      .catch((err) => {
        dispatch({ type: t.AUTH_FETCH_ERROR, payload: err.message })
      })
  }
