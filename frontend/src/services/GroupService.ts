import {useState} from "react";

export interface GroupServiceImpl {
    addGroup: (data: {}) => void
    getAllGroups: () => GroupItem[]
    refreshAllGroups: (kitaId: string) => void
}

export interface GroupItem {
    id: string,
    name: string,
    kitaId: string,
    kitaName: string
}


const GroupService = (callBackend: (url: string, requestMethod: string, data: {}) => Promise<any>) => {

    const [groupItems, setGroupItems] = useState<GroupItem[]>([]);

    const addGroup = (data: {}) => {
        callBackend('/api/group/addnewgroup', 'POST', data)
            .then((json: GroupItem[]) => setGroupItems(json))
    }

    const refreshAllGroups = (playSchoolId: string) => {
        callBackend('/api/group/getAllGroups/' + playSchoolId, 'GET', {})
            .then((json: GroupItem[]) => setGroupItems(json))
    }

    return {
        addGroup,
        getAllGroups: () => groupItems,
        refreshAllGroups
    }
}

export default GroupService