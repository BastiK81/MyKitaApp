import React, {createContext, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";
import {KitaCom} from "./KitaProvider";

export interface IKindProvider {
    childItems: KindItem[],
    refreshKinder: (playSchoolId: string) => void,
    addNewChild: (data: {}) => void
    deleteKind: (kindId: string) => void
}

export interface KindItem {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    parents: string[],
    kitaId: string,
    groupId: string
}

export const KindCom = createContext<IKindProvider>({
    childItems: [],
    deleteKind(kindId: string): void {
        throw new Error("Could not delete Kind")
    },
    refreshKinder: () => {
        throw new Error("User not set")
    },
    addNewChild: () => {
        throw new Error("Users not set")
    }
})

const ChildrenProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)
    const {kitaItem} = useContext(KitaCom);

    const [childItems, setChildItems] = useState<KindItem[]>([]);

    const addNewChild = (data: {}) => {
        callBackend('/api/child/addNewChild', 'POST', data)
            .then((json: KindItem[]) => setChildItems(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const refreshKinder = (KitaId: string) => {
        callBackend('/api/child/getAllChildren/' + KitaId, 'GET', {})
            .then((json: KindItem[]) => {
                setChildItems(json)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const deleteKind = (kindId: string) => {
        callBackend('/api/child/delete/' + kindId, 'DELETE', {})
            .catch((error) => {
                console.error('Error:', error);
            });
        refreshKinder(kitaItem.id)
    }

    return (
        <KindCom.Provider value={{deleteKind, childItems, addNewChild, refreshKinder: refreshKinder}}>
            {children}
        </KindCom.Provider>
    )

}

export default ChildrenProvider