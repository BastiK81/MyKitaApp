import {useState} from "react";

export interface IKinderInformationService {
    addChild: (data: {}) => void
    getItems: () => ChildItem[]
    getItemsFromBackend: (kitaId: string) => void
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

const KinderInformationService = (jwt: string) => {

    const [childItems, setChildItems] = useState<ChildItem[]>([]);

    async function getAllItems(url: string) {
        const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt,
                }
            })
        if (!response.ok) {
            throw new Error("HTTP status " + response.status);
        }
        return response.json();
    }

    async function addNewGroup(url: string, data: {}) {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt,
                },
                body: JSON.stringify(data)
            })
        if (!response.ok) {
            throw new Error("HTTP status " + response.status);
        }
        return response.json();
    }

    const addChild = (data: {}) => {
        addNewGroup('/api/child/addNewChild', data)
            .then(json => {
                let tempItems: ChildItem[] = [];
                for (let i = 0; i < json.length; i++) {
                    let item: ChildItem = {
                        id: json[i].id,
                        firstName: json[i].firstName,
                        lastName: json[i].lastName,
                        dateOfBirth: json[i].dateOfBirth,
                        parents: json[i].parents,
                        kitaId: json[i].kitaId,
                        groupId: json[i].groupId
                    }
                    tempItems.push(item)
                }
                setChildItems(tempItems)
            })

    }

    const getItemsFromBackend = (kitaId: string) => {
        getAllItems('/api/child/getAllChildren/' + kitaId)
            .then(json => {
                let tempItems: ChildItem[] = [];
                for (let i = 0; i < json.length; i++) {
                    let item: ChildItem = {
                        id: json[i].id,
                        firstName: json[i].firstName,
                        lastName: json[i].lastName,
                        dateOfBirth: json[i].dateOfBirth,
                        parents: json[i].parents,
                        kitaId: json[i].kitaId,
                        groupId: json[i].groupId
                    }
                    tempItems.push(item)
                }
                setChildItems(tempItems)
            })
    }

    return {
        addChild,
        getItems: () => childItems,
        getItemsFromBackend
    }

}

export default KinderInformationService