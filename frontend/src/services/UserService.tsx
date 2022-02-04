import {useState} from "react";

export interface UserItem {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
}

export interface UserServiceImpl {
    user: UserItem,
    refreshUser: () => void,
    refreshAllUser: () => void,
    getAllUser: () => UserItem[]
}

const UserService = (jwt: string, getKitaInformation: () => void, callBackend: (url: string, requestMethod: string, data: {}) => Promise<any>) => {

    const [user, setUser] = useState<UserItem>({email: "", id: "", lastName: "", firstName: ""})
    const [allUser, setAllUser] = useState<UserItem[]>([])

    const refreshAllUser = () => {
        callBackend("/api/user/getalluser", 'GET', {})
            .then((json: UserItem[]) => setAllUser(json))
    }

    const refreshUser = () => {
        callBackend("/api/user/getuserinformation", 'GET', {})
            .then((json: UserItem) => {
                setUser(json)
                getKitaInformation()
            })
    }

    return {
        user,
        refreshUser,
        refreshAllUser,
        getAllUser: () => allUser
    }
}

export default UserService