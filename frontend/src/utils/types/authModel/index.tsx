import { ServerStatus } from "../global"

export type loggedUser = {
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
    token: string
}

export type AuthReducerPropsType = {
    authStatus: ServerStatus
    auth?: loggedUser
  }