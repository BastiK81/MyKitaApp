import React, {createContext, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";
import {UserItem} from "./UserProvider";
import {PlaySchoolItem} from "./PlaySchoolProvider";

export interface IConnectorProvider {
    connector: ConnectorItem[],
    users: UserItem[],
    kitas: PlaySchoolItem[],
    getAllKitas: () => void,
    refreshUsers: (playSchoolId: string) => void,
    getAllAccepted: (playSchoolId: string) => void,
    getAllInProgress: (playSchoolId: string) => void,
    getAllPending: (playSchoolId: string) => void,
    addUserConnection: (userId: string, playSchoolId: string, userRole: string) => void,
}

export interface ConnectorItem {
    id: string,
    userId: string,
    kitaId: string,
    userStatus: string,
    kitaStatus: string,
    userRole: string,
    implementationDate: Date,
    expireDate: Date
}

export const ConnectorCom = createContext<IConnectorProvider>({
    connector: [],
    users: [],
    kitas: [],
    getAllKitas: () => {},
    refreshUsers: () => {},
    getAllAccepted: () => {},
    getAllInProgress: () => {},
    getAllPending: () => {},
    addUserConnection: () => {},
})

const ConnectorProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)

    const [connector, setConnector] = useState<ConnectorItem[]>([])
    const [users, setUsers] = useState<UserItem[]>([])
    const [kitas, setKitas] = useState<PlaySchoolItem[]>([]);

    const refreshUsers = (playSchoolId: string) => {
        callBackend("/api/userConnection/getAllConnectableUser/" + playSchoolId, 'GET', {})
            .then((json: UserItem[]) => setUsers(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllAccepted = (playSchoolId: string) => {
        callBackend("/api/userConnection/getAllAccepted/" + playSchoolId, 'GET', {})
            .then((json: ConnectorItem[]) => setConnector(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllInProgress = (playSchoolId: string) => {
        callBackend("/api/userConnection/getAllInProgress/" + playSchoolId, 'GET', {})
            .then((json: ConnectorItem[]) => setConnector(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllPending = (playSchoolId: string) => {
        callBackend("/api/userConnection/getAllPending/" + playSchoolId, 'GET', {})
            .then((json: ConnectorItem[]) => setConnector(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllKitas = () => {
        callBackend("/api/kita/getAllKitas/PUBLIC", 'GET', {})
            .then((json: PlaySchoolItem[]) => setKitas(json))
    }

    const addUserConnection = (userId: string, playSchoolId: string, userRole: string) => {
        const data = {
            userId: userId,
            kitaId: playSchoolId,
            userRole: userRole,
        }
        callBackend("/api/userConnection/add", 'POST', data)
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <ConnectorCom.Provider
            value={{
                connector,
                users,
                kitas,
                getAllKitas,
                refreshUsers,
                getAllAccepted,
                getAllInProgress,
                getAllPending,
                addUserConnection: addUserConnection
            }}>
            {children}
        </ConnectorCom.Provider>
    )

}

export default ConnectorProvider