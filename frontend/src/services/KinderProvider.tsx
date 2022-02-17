import React, {createContext, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";
import {KitaCom} from "./KitaProvider";
import {UserItem} from "./UserProvider";

export interface IKindProvider {
    kindItems: KindItem[],
    kind: KindItem,
    refreshKinder: (playSchoolId: string) => void,
    addNewChild: (data: {}) => void,
    deleteKind: (kindId: string) => void,
    resetKindItem: (value: KindItem) => void,
    updateKind: (data: {}) => void
}

export interface KindItem {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    parents: UserItem[],
    kitaId: string,
    groupId: string
}

export const KindCom = createContext<IKindProvider>({
    updateKind(data: {}): void {
        throw new Error("Could not change Kind")
    },
    kindItems: [],
    kind: {
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
        parents: [],
        kitaId: '',
        groupId: ''
    },
    resetKindItem(value: KindItem): void {
        throw new Error("Could not reset Kind")
    },
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

    const [kindItems, setKindItems] = useState<KindItem[]>([]);
    const [kind, setKind] = useState<KindItem>({
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
        parents: [],
        kitaId: '',
        groupId: ''
    });

    const addNewChild = (data: {}) => {
        callBackend('/api/child/addNewChild', 'POST', data, true)
            .then((json: KindItem[]) => setKindItems(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const refreshKinder = (KitaId: string) => {
        callBackend('/api/child/getAllChildren/' + KitaId, 'GET', {}, false)
            .then((json: KindItem[]) => {
                setKindItems(json)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const deleteKind = (kindId: string) => {
        callBackend('/api/child/delete/' + kindId, 'DELETE', {}, false)
            .catch((error) => {
                console.error('Error:', error);
            });
        refreshKinder(kitaItem.id)
    }

    const resetKindItem = (value: KindItem) => {
        setKind(value)
    }

    const updateKind = (data: {}) => {
        callBackend('/api/child/updatechild', 'PUT', data, true)
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <KindCom.Provider
            value={{kind, updateKind, resetKindItem, deleteKind, kindItems, addNewChild, refreshKinder}}>
            {children}
        </KindCom.Provider>
    )

}

export default ChildrenProvider