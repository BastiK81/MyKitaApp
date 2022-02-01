import {useState} from "react";

export interface IGruppenInformationService{
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

    const getItemsFromBackend = (kitaId:string) => {
        getAllItems('/api/getAllGroups/{' + kitaId + '}')
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
        getItems: () => groupItems,
        getItemsFromBackend
    }
}

export default GruppenInformationService