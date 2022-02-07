import React, {createContext, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";

export interface IGroupProvider {
    groupItems: GroupItem[]
    addGroup: (data: {}) => void
    refreshAllGroups: (kitaId: string) => void
}

export interface GroupItem {
    id: string,
    name: string,
    kitaId: string,
    kitaName: string
}

export const GroupCom = createContext<IGroupProvider>({
    groupItems: [],
    refreshAllGroups: () => {
        throw new Error("User not set")
    },
    addGroup: () => {
        throw new Error("Users not set")
    }
})

const GroupProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)

    const [groupItems, setGroupItems] = useState<GroupItem[]>([]);

    const addGroup = (data: {}) => {
        callBackend('/api/group/addnewgroup', 'POST', data)
            .then((json: GroupItem[]) => setGroupItems(json))
    }

    const refreshAllGroups = (playSchoolId: string) => {
        callBackend('/api/group/getAllGroups/' + playSchoolId, 'GET', {})
            .then((json: GroupItem[]) => setGroupItems(json))
    }

    return (
        <GroupCom.Provider value={{groupItems, addGroup, refreshAllGroups}}>
            {children}
        </GroupCom.Provider>
    )

}

export default GroupProvider