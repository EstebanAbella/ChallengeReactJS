import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import clientsReducer from './client/reducer'
import inboundCaseReducer from './inboundCase/reducer'

const rootReducer = combineReducers({
	auth: authReducer,
	clients: clientsReducer,
	inboundCase: inboundCaseReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
