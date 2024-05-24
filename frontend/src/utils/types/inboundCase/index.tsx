import { ServerStatus } from '../global'

export type InboundCaseType = {
	id: number
	client: {
		id: number
		name: string
	}
	case_uuid: string
	phone: number
	first_name: string
	last_name: string
	code: null
	case_result: {
		result_id: number
		name: string
		is_final: boolean
		contacted: boolean
	}
	case_duration: string
	case_log: {
		responses: Array<{
			text: string
			time: number
			confidence: number
		}>
		result_id: number
		commitment: string
		got_promise: boolean
		transcription: Array<{
			text: string
			time: number
			confidence: number
		}>
		final_sip_code: number
	}
	extra_metadata: {
		dni: string
		grupo: string
		orden: string
	}
	recording: string
	is_complete: boolean
	status: string
	last_updated: string
	is_active: boolean
}

export type InboundCaseReducerPropsType = {
	inboundCaseStatus: ServerStatus
	inboundCase?: InboundCaseType[]
}
