import React, {createContext, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";
import {useNavigate} from "react-router-dom";

export interface IUserProvider {
    user: UserItem,
    refreshUser: () => void,
    allUser: UserItem[]
    refreshAllUser: (visibility: string) => void,
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

    const navigate = useNavigate();

    const {callBackend} = useContext(BackendCom)

    const [user, setUser] = useState<UserItem>({email: "", id: "", lastName: "", firstName: ""})
    const [allUser, setAllUser] = useState<UserItem[]>([])

    const resetUser = (user: UserItem) => {
        setUser(user)
    }

    const resetAllUser = (users: UserItem[]) => {
        setAllUser(users)
    }

    const refreshAllUser = (visibility: string) => {
        callBackend("/api/user/getalluser/" + visibility, 'GET', {})
            .then((json: UserItem[]) => resetAllUser(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const refreshUser = () => {
        callBackend("/api/user/getuserinformation", 'GET', {})
            .then((json: UserItem) => {
                resetUser(json)
            })
            .catch((error) => {
                console.error('Error:', error);
                navigate('/404', {replace: true});
            })
    }

    return (
        <UserCom.Provider value={{user, refreshUser, allUser, refreshAllUser}}>
            {children}
        </UserCom.Provider>
    )

}

export default UserProvider