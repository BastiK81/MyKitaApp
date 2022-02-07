import React, {createContext, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";

export interface IChildrenProvider {
    childItems: ChildItem[],
    refreshChildren: (playSchoolId: string) => void,
    addNewChild: (data: {}) => void
}

export interface ChildItem {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    parents: string[],
    kitaId: string,
    groupId: string
}

export const ChildCom = createContext<IChildrenProvider>({
    childItems: [],
    refreshChildren: () => {
        throw new Error("User not set")
    },
    addNewChild: () => {
        throw new Error("Users not set")
    }
})

const ChildrenProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)

    const [childItems, setChildItems] = useState<ChildItem[]>([]);

    const addNewChild = (data: {}) => {
        callBackend('/api/child/addNewChild', 'POST', data)
            .then((json: ChildItem[]) => setChildItems(json))
    }


    const refreshChildren = (playSchoolId: string) => {
        callBackend('/api/child/getAllChildren/' + playSchoolId, 'GET', {})
            .then((json: ChildItem[]) => setChildItems(json))
    }

    return (
        <ChildCom.Provider value={{childItems, addNewChild, refreshChildren}}>
            {children}
        </ChildCom.Provider>
    )

}

export default ChildrenProvider