import { ServerStatus } from '../global'

export type clientListType = {
	id: number
	name: string
	users: Array<{
		id: number
		email: string
		first_name: string
		last_name: string
		profile_image: null
		groups: Array<{
			id: number
			name: string
		}>
		is_active: boolean
	}>
}

export type ClientsReducerPropsType = {
	clientsStatus: ServerStatus
	clients?: clientListType[]
}
