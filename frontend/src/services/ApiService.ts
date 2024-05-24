import axios, { AxiosInstance } from 'axios'
import { CustomErrorType } from '../utils/types/global'
import LocalDataService from './LocalDataService'
import { loggedUser } from '../utils/types/authModel'
import { clientListType } from '../utils/types/clientType'
import { InboundCaseType } from '../utils/types/inboundCase'

export interface globalType {
	apiInstance?: ApiService
}

export interface AuthUserType {
	accessToken: string
}

export interface ApiServiceError {
	code: string
	message: string
}

const apiUrls = {
	/* auth */
	login: '/api/v1/login/',
	/* clients */
	clients: '/api/v1/clients/',
	/* inboundCase */
	inboundCase: '/api/v1/inbound-case/'
}

const envVars = {
	// apiUrl: process.env.NEXT_PUBLIC_API_URI
	apiUrl: 'https://admindev.inceptia.ai'
}

class ApiService {
	axios: AxiosInstance
	token?: string

	constructor() {
		if ((global as globalType).apiInstance) {
			throw new Error('New instance cannot be created!!')
		} else {
			this.axios = axios.create({
				baseURL: envVars.apiUrl,
				timeout: 50000,
				timeoutErrorMessage: 'Tiempo de respuesta excedido',
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
		;(global as globalType).apiInstance = this
	}

	getInstance(): this {
		return this
	}

	errorComposer(error: any): CustomErrorType {
		try {
			if (error.code === 'ECONNABORTED') {
				return { statusCode: 501, statusMessage: error.message }
			} else {
				const statusCode = error.response?.status ? error.response.status : null
				const statusMessage = error.response?.data.error ? error.response?.data.error : 'Generic Error'
				if (statusCode) return { statusCode, statusMessage }
				return { statusCode: 501, statusMessage }
			}
		} catch (e: unknown) {
			return { statusCode: 501, statusMessage: 'Generic Error' }
		}
	}

	setToken(token: string): void {
		this.axios.defaults.headers.common.Authorization = `${token}`
		this.token = token
	}

	async doLogin(email: string, password: string): Promise<loggedUser | CustomErrorType> {
		return await new Promise<loggedUser>((resolve, reject) => {
			const body = { email, password }
			this.axios
				.post(apiUrls.login, body)
				.then((response) => {
					const user = response.data as loggedUser
					this.setToken(response.data.token)
					LocalDataService.getInstance().saveToken(response.data.token)
					LocalDataService.getInstance().saveUserId(response.data.id)
					resolve(user)
				})
				.catch((e) => {
					reject(this.errorComposer(e))
				})
		})
	}

	async getClients(): Promise<any[] | CustomErrorType> {
		return await new Promise<any[]>((resolve, reject) => {
			this.axios
				.get(apiUrls.clients, {
					headers: { authorization: `JWT ${this.token}` }
				})
				.then((response) => {
					const clients = response.data as clientListType[]
					resolve(clients)
				})
				.catch((e) => {
					reject(this.errorComposer(e))
				})
		})
	}

	async getInboundCase(id: number, gte: string, lte: string): Promise<any[] | CustomErrorType> {
		return await new Promise<any[]>((resolve, reject) => {
			const params = {
				bot: id,
				local_updated__date__gte: gte,
				local_updated__date__lte: lte
			}
			this.axios
				.get(apiUrls.inboundCase, {
					params,
					headers: { authorization: `JWT ${this.token}` }
				})
				.then((response) => {
					const inboundCase = response.data.results as InboundCaseType[]
					resolve(inboundCase)
				})
				.catch((e) => {
					reject(this.errorComposer(e))
				})
		})
	}
}

let ApiServiceSingleton
if (!(global as globalType).apiInstance) ApiServiceSingleton = new ApiService()
else ApiServiceSingleton = (global as globalType).apiInstance
export default ApiServiceSingleton as ApiService
