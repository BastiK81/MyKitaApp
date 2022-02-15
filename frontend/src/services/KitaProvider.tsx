import React, {createContext, Dispatch, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";

export interface IKitaProvider {
    kitaVisibility: string,
    setKitaVisibility: Dispatch<React.SetStateAction<string>>,
    hasKita: boolean,
    refreshKita: () => void,
    kitaItem: KitaItem
    addNewKita: (data: {}) => void,
    addKitaUserConnection: (userId: string, kitaId: string, userRole: string) => void,
    getVisibility: (kitaId: string) => void,
    changeVisibility: (kitaId: string, data: string) => void,
}


export interface KitaItem {
    id: string,
    name: string,
    street: string,
    houseNumber: string,
    postcode: string,
    city: string,
}

export const KitaCom = createContext<IKitaProvider>({
    kitaVisibility: '',
    setKitaVisibility: () => {
    },
    kitaItem: {
        city: "",
        houseNumber: "",
        name: "",
        id: "",
        postcode: "",
        street: "",
    },
    refreshKita: () => {
    },
    hasKita: false,
    addNewKita: () => {
    },
    addKitaUserConnection: () => {
    },
    getVisibility: () => {
    },
    changeVisibility: () => {
    },
})

const KitaProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)

    const [kitaVisibility, setKitaVisibility] = useState('PRIVATE');
    const [hasKita, setHasKita] = useState(false)
    const [kitaItem, setKitaItem] = useState<KitaItem>({
        city: "",
        houseNumber: "",
        name: "",
        id: "",
        postcode: "",
        street: "",
    })

    const addNewKita = (data: {}) => {
        callBackend('/api/kita/addkita', 'POST', data)
            .then((json: KitaItem) => {
                setKitaItem(json)
                setHasKita(true)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const refreshKita = () => {
        callBackend('/api/kita/getkita', 'GET', {})
            .then((json: KitaItem) => {
                setHasKita(true)
                setKitaItem(json)
            })
            .catch((error) => {
                setHasKita(false)
                setKitaItem({city: "", houseNumber: "", id: "", name: "", postcode: "", street: ""})
                console.error('Error:', error);
            })
    }

    const addKitaUserConnection = (userId: string, kitaId: string, userRole: string) => {
        const data = {
            userId: userId,
            kitaId: kitaId,
            userRole: userRole,
        }
        callBackend("/api/kita/addkitauserconnector", 'POST', data)
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getVisibility = (kitaId: string) => {
        callBackend("/api/kita/getVisibility/" + kitaId, 'GET', {})
            .then((json) => setKitaVisibility(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const changeVisibility = (kitaId: string, data: string) => {
        callBackend("/api/kita/changeVisibility/" + kitaId, 'POST', data)
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <KitaCom.Provider
            value={{
                hasKita,
                kitaVisibility,
                setKitaVisibility,
                addNewKita: addNewKita,
                kitaItem: kitaItem,
                refreshKita: refreshKita,
                addKitaUserConnection: addKitaUserConnection,
                getVisibility,
                changeVisibility
            }}>
            {children}
        </KitaCom.Provider>
    )

}

export default KitaProvider