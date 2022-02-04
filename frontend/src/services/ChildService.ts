import {useState} from "react";

export interface ChildServiceImpl {
    addChild: (data: {}) => void
    getAllChildren: () => ChildItem[]
    refreshAllChildren: (playSchoolId: string) => void
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

const ChildService = (callBackend: (url: string, requestMethod: string, data: {}) => Promise<any>) => {

    const [childItems, setChildItems] = useState<ChildItem[]>([]);

    const addChild = (data: {}) => {
        callBackend('/api/child/addNewChild', 'POST', data)
            .then((json: ChildItem[]) => setChildItems(json))
    }

    const refreshAllChildren = (playSchoolId: string) => {
        callBackend('/api/child/getAllChildren/' + playSchoolId, 'GET', {})
            .then((json: ChildItem[]) => setChildItems(json))
    }

    return {
        addChild,
        getAllChildren: () => childItems,
        refreshAllChildren
    }

}

export default ChildService