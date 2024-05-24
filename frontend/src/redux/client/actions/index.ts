import ApiService from '../../../services/ApiService'
import { CustomErrorType } from '../../../utils/types/global'
import * as t from '../types'

export const getClients = () => (dispatch: (v: any) => void) => {
	dispatch({ type: t.CLIENTS_FETCHING })
	ApiService.getClients()
		.then((result) => {
			dispatch({
				type: t.CLIENTS_FETCH,
				payload: result
			})
		})
		.catch((error: CustomErrorType) => {
			dispatch({
				type: t.CLIENTS_FETCH_ERROR
			})
		})
}
