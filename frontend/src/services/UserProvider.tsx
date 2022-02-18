import React, {createContext, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";
import {useNavigate} from "react-router-dom";

export interface UserRole {
    id: string,
    role: string
}

export const userRoles: UserRole[] = [
    {id: '1', role: 'ADMIN'},
    {id: '2', role: 'USER'},
    {id: '3', role: 'EDUCATOR'},
    {id: '4', role: 'PARENT'},
    {id: '5', role: 'NONE'}
]

export interface IUserProvider {
    user: UserItem,
    visibility: string,
    getVisibility: () => void,
    refreshUser: (reload: boolean) => void,
    allUser: UserItem[]
    refreshAllUser: (visibility: string) => void,
    setUserVisibility: (visibility: string) => void,
}

export const UserCom = createContext<IUserProvider>({
    user: {email: "", id: "", lastName: "", firstName: ""},
    visibility: '',
    refreshUser: () => {
        throw new Error("User not set")
    },
    getVisibility: () => {
        throw new Error("User not set")
    },
    allUser: [],
    refreshAllUser: () => {
        throw new Error("Users not set")
    },
    setUserVisibility: () => {
        throw new Error("Users not set")
    },
})

export type UserVisibility = 'INVISIBLE' | 'VISIBLE' | 'PLAYSCHOOL' | 'GROUP' | 'PLAYSCHOOLADMIN'
export const userVisibility: UserVisibility[] = ['INVISIBLE', 'VISIBLE', 'PLAYSCHOOL', 'GROUP', 'PLAYSCHOOLADMIN']

export interface UserVisibilityMap {
    [key: string]: boolean
}

export interface UserItem {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
}

const UserProvider = ({children}: { children: ReactElement<any, any> }) => {

    const navigate = useNavigate();

    const {callBackend} = useContext(BackendCom)

    const [user, setUser] = useState<UserItem>({email: "", id: "", lastName: "", firstName: ""})
    const [allUser, setAllUser] = useState<UserItem[]>([])
    const [visibility, setVisibility] = useState('');

    const resetUser = (user: UserItem) => {
        setUser(user)
    }

    const resetAllUser = (users: UserItem[]) => {
        setAllUser(users)
    }

    const refreshAllUser = (visibility: string) => {
        callBackend("/api/user/getalluser/" + visibility, 'GET', {}, false)
            .then((json: UserItem[]) => resetAllUser(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const refreshUser = (reload: boolean) => {
        callBackend("/api/user/getuserinformation", 'GET', {}, false)
            .then((json: UserItem) => {
                resetUser(json)
                if (reload) {
                    navigate('/main/welcome', {replace: true});
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                if (!reload) {
                    navigate('/404', {replace: true});
                }
            })
    }

    const getVisibility = () => {
        callBackend("/api/user/getUserVisibility", 'GET', {}, false)
            .then((json: string) => setVisibility(json))
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    const setUserVisibility = (visibility: string) => {
        setVisibility(visibility)
        callBackend("/api/user/setUserVisibility", 'POST', visibility, true)
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    return (
        <UserCom.Provider
            value={{visibility, user, refreshUser, allUser, refreshAllUser, getVisibility, setUserVisibility}}>
            {children}
        </UserCom.Provider>
    )

}

export default UserProvider