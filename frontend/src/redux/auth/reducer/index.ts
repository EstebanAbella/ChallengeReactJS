import { AuthReducerPropsType, loggedUser } from '../../../utils/types/authModel'
import { ServerStatus } from '../../../utils/types/global'
import * as t from '../types'

const globalState: AuthReducerPropsType = {
	authStatus: ServerStatus.IDLE
}

export type PossibleActions = { type: 'AUTH_FETCHING' } | { type: 'AUTH_FETCH'; payload: loggedUser } | { type: 'AUTH_FETCH_ERROR' }

const reducer = (state = globalState, action: PossibleActions): AuthReducerPropsType => {
	switch (action.type) {
		case t.AUTH_FETCHING: {
			return {
				...state,
				authStatus: ServerStatus.FETCHING
			}
		}
		case t.AUTH_FETCH: {
			return {
				...state,
				authStatus: ServerStatus.FETCH,
				auth: action.payload
			}
		}
		case t.AUTH_FETCH_ERROR: {
			return {
				...state,
				authStatus: ServerStatus.FETCH_ERROR
			}
		}

		default:
			return {
				...state
			}
	}
}

export default reducer
