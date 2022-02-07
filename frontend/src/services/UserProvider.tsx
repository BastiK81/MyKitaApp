import React, {createContext, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";

export interface IUserProvider {
    user: UserItem,
    refreshUser: () => void,
    allUser: UserItem[]
    refreshAllUser: () => void,
}

export interface UserItem {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
}

export const UserCom = createContext<IUserProvider>({
    user: {email: "", id: "", lastName: "", firstName: ""},
    refreshUser: () => {
        throw new Error("User not set")
    },
    allUser: [],
    refreshAllUser: () => {
        throw new Error("Users not set")
    }
})

const UserProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)

    const [user, setUser] = useState<UserItem>({email: "", id: "", lastName: "", firstName: ""})
    const [allUser, setAllUser] = useState<UserItem[]>([])

    const resetUser = (user: UserItem) => {
        setUser(user)
    }

    const resetAllUser = (users: UserItem[]) => {
        setAllUser(users)
    }

    const refreshAllUser = () => {
        callBackend("/api/user/getalluser", 'GET', {})
            .then((json: UserItem[]) => resetAllUser(json))
    }

    const refreshUser = () => {
        callBackend("/api/user/getuserinformation", 'GET', {})
            .then((json: UserItem) => {
                resetUser(json)
            })
    }

    return (
        <UserCom.Provider value={{user, refreshUser, allUser, refreshAllUser}}>
            {children}
        </UserCom.Provider>
    )

}

export default UserProvider