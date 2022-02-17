import React, {createContext, Dispatch, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";
import {KitaCom} from "./KitaProvider";
import {KindItem} from "./KinderProvider";

export interface IGroupProvider {
    groupItems: GroupItem[],
    page: number,
    setPage: Dispatch<React.SetStateAction<number>>,
    rowsPerPage: number,
    setRowsPerPage: Dispatch<React.SetStateAction<number>>,
    selected: string[],
    setSelected: Dispatch<React.SetStateAction<string[]>>,
    groupItem: GroupItem,

    addGroup: (data: {}) => void
    refreshAllGroups: (kitaId: string) => void,
    deleteGroup: (groupId: string) => void,
    getGroupById: (groupId: string) => void,
}

export interface GroupItem {
    id: string,
    name: string,
    kitaId: string,
    kitaName: string,
    kinder: KindItem[],
}

export const GroupCom = createContext<IGroupProvider>({
    groupItem: {id: '', name: '', kitaId: '', kitaName: '', kinder: []},
    getGroupById(groupId: string): void {
    },
    groupItems: [],
    page: 0,
    setPage: () => {
        throw new Error("page not set")
    },
    rowsPerPage: 5,
    setRowsPerPage: () => {
        throw new Error("rows per page not set")
    },
    selected: [],
    setSelected: () => {
        throw new Error("could not select item")
    },
    refreshAllGroups: () => {
        throw new Error("Could not refresh Groups")
    },
    addGroup: () => {
        throw new Error("Could not add Group")
    },
    deleteGroup: () => {
        throw new Error("Could not delete Group")
    }
})

const GroupProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)
    const {kitaItem} = useContext(KitaCom);

    const [groupItem, setGroupItem] = useState<GroupItem>({id: '', name: '', kitaId: '', kitaName: '', kinder: []});
    const [groupItems, setGroupItems] = useState<GroupItem[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState<string[]>([]);

    const getGroupById = (groupId: string) => {
        callBackend('/api/group/getgroupbyid/' + groupId, 'GET', {}, false)
            .then((json: GroupItem) => setGroupItem(json))
    }

    const addGroup = (data: {}) => {
        callBackend('/api/group/addnewgroup', 'POST', data, true)
            .then((json: GroupItem[]) => setGroupItems(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const refreshAllGroups = (playSchoolId: string) => {
        callBackend('/api/group/getallgroups/' + playSchoolId, 'GET', {}, false)
            .then((json: GroupItem[]) => setGroupItems(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const deleteGroup = (groupId: string) => {
        callBackend('/api/group/delete/' + groupId, 'DELETE', {}, false)
            .catch((error) => {
                console.error('Error:', error);
            });
        refreshAllGroups(kitaItem.id)
    }

    return (
        <GroupCom.Provider value={{
            getGroupById,
            groupItems,
            page,
            setPage,
            rowsPerPage,
            setRowsPerPage,
            selected,
            setSelected,
            groupItem,
            addGroup,
            refreshAllGroups,
            deleteGroup
        }}>
            {children}
        </GroupCom.Provider>
    )

}

export default GroupProvider