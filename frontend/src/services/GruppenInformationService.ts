import {useState} from "react";

export interface IGruppenInformationService{
    addGroup: (data:{}) => void
    getItems: () => GroupItem[]
    getItemsFromBackend: (kitaId:string) => void
}

export interface GroupItem{
    id: string,
    name: string,
    kitaId: string,
    kitaName: string
}


const GruppenInformationService = (jwt:string) => {

    const [groupItems, setGroupItems] = useState<GroupItem[]>([]);

    async function getAllItems(url:string) {
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

    async function addNewGroup(url:string, data:{}) {
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

    const addGroup = (data:{}) => {
        addNewGroup('/api/group/addnewgroup', data)
            .then(json => {
                let tempItems:GroupItem[] = [];
                for (let i = 0; i < json.length; i++) {
                    let item:GroupItem = {id: json[i].id, name: json[i].name, kitaId: json[i].kitaId, kitaName: json[i].kitaName}
                    tempItems.push(item)
                }
                setGroupItems(tempItems)
            })

    }

    const getItemsFromBackend = (kitaId:string) => {
        getAllItems('/api/group/getAllGroups/' + kitaId)
            .then(json => {
                let tempItems:GroupItem[] = [];
                for (let i = 0; i < json.length; i++) {
                    let item:GroupItem = {id: json[i].id, name: json[i].name, kitaId: json[i].kitaId, kitaName: json[i].kitaName}
                    tempItems.push(item)
                }
                setGroupItems(tempItems)
            })
    }



    return{
        addGroup,
        getItems: () => groupItems,
        getItemsFromBackend
    }
}

export default GruppenInformationService