import ApiService from '../../../services/ApiService'
import { CustomErrorType } from '../../../utils/types/global'
import * as t from '../types'

export const getInboundCase = (id: number, gte: string, lte: string) => (dispatch: (v: any) => void) => {
	dispatch({ type: t.INBOUNDCASE_FETCHING })
	ApiService.getInboundCase(id, gte, lte)
		.then((result) => {
			dispatch({
				type: t.INBOUNDCASE_FETCH,
				payload: result
			})
		})
		.catch((error: CustomErrorType) => {
			dispatch({
				type: t.INBOUNDCASE_FETCH_ERROR
			})
		})
}
