import { ServerStatus } from '../../../utils/types/global'
import { InboundCaseReducerPropsType, InboundCaseType } from '../../../utils/types/inboundCase'
import * as t from '../types'

const globalState: InboundCaseReducerPropsType = {
	inboundCaseStatus: ServerStatus.IDLE
}

export type PosibleActions = { type: 'INBOUNDCASE_FETCHING' } | { type: 'INBOUNDCASE_FETCH'; payload: InboundCaseType[] } | { type: 'INBOUNDCASE_FETCH_ERROR' }

const reducer = (state = globalState, action: PosibleActions): InboundCaseReducerPropsType => {
	switch (action.type) {
		case t.INBOUNDCASE_FETCHING: {
			return {
				...state,
				inboundCaseStatus: ServerStatus.FETCHING
			}
		}
		case t.INBOUNDCASE_FETCH: {
			return {
				...state,
				inboundCaseStatus: ServerStatus.FETCH,
				inboundCase: action.payload
			}
		}
		case t.INBOUNDCASE_FETCH_ERROR: {
			return {
				...state,
				inboundCaseStatus: ServerStatus.FETCH_ERROR
			}
		}

		default:
			return {
				...state
			}
	}
}

export default reducer
