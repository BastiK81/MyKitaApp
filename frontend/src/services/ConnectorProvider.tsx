import React, {createContext, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";
import {UserItem} from "./UserProvider";

export interface IConnectorProvider {
    connector: ConnectorItem[],
    users: UserItem[],
    refreshUsers: (playSchoolId: string) => void,
    getAllAccepted: (playSchoolId: string) => void,
    getAllInProgress: (playSchoolId: string) => void,
    getAllPending: (playSchoolId: string) => void,
}

export interface ConnectorItem {
    id: string,
    userId: string,
    kitaId: string,
    userStatus: string,
    kitaStatus: string,
    userRole: string,
    implementationDate: Date,
    expireDate: Date,
}

export const ConnectorCom = createContext<IConnectorProvider>({
    connector: [],
    users: [],
    refreshUsers: () => {
        throw new Error("Users not set")
    },
    getAllAccepted: () => {
        throw new Error("Users not set")
    },
    getAllInProgress: () => {
        throw new Error("Users not set")
    },
    getAllPending: () => {
        throw new Error("Users not set")
    }
})

const ConnectorProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)

    const [connector, setConnector] = useState<ConnectorItem[]>([])
    const [users, setUsers] = useState<UserItem[]>([])

    const resetConnectors = (connectors: ConnectorItem[]) => {
        setConnector(connectors)
    }

    const resetUsers = (users: UserItem[]) => {
        setUsers(users)
    }

    const refreshUsers = (playSchoolId: string) => {
        callBackend("/api/playSchoolUserConnection/getAllConnectableUser/" + playSchoolId, 'GET', {})
            .then((json: UserItem[]) => resetUsers(json))
    }

    const getAllAccepted = (playSchoolId: string) => {
        callBackend("/api/playSchoolUserConnection/getAllAccepted/" + playSchoolId, 'GET', {})
            .then((json: ConnectorItem[]) => resetConnectors(json))
    }

    const getAllInProgress = (playSchoolId: string) => {
        callBackend("/api/playSchoolUserConnection/getAllInProgress/" + playSchoolId, 'GET', {})
            .then((json: ConnectorItem[]) => resetConnectors(json))
    }

    const getAllPending = (playSchoolId: string) => {
        callBackend("/api/playSchoolUserConnection/getAllPending/" + playSchoolId, 'GET', {})
            .then((json: ConnectorItem[]) => resetConnectors(json))
    }


    return (
        <ConnectorCom.Provider
            value={{connector: connector, users: users, refreshUsers, getAllAccepted, getAllInProgress, getAllPending}}>
            {children}
        </ConnectorCom.Provider>
    )

}

export default ConnectorProvider