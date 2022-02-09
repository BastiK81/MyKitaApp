import React, {createContext, Dispatch, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";

export interface IPlaySchoolProvider {
    kitaVisibility: KitaVisibility,
    setKitaVisibility: Dispatch<React.SetStateAction<KitaVisibility>>,
    hasKita: boolean,
    refreshPlaySchool: () => void,
    playSchoolItem: PlaySchoolItem
    addNewPlaySchool: (data: {}) => void,
    addPlaySchoolUserConnection: (userId: string, playSchoolId: string, userRole: string) => void,
    getVisibility: (kitaId:string) => void,
}

export type KitaVisibilityEnums = 'PUBLIC' | 'KITA' | 'PRIVATE'

export interface KitaVisibility {
    [key:string]:boolean | undefined
}

interface PlaySchoolItem {
    id: string,
    name: string,
    street: string,
    houseNumber: string,
    postcode: string,
    city: string,
}

export const PlaySchoolCom = createContext<IPlaySchoolProvider>({
    kitaVisibility: {},
    setKitaVisibility: () => {
        throw new Error("User not set")
    },
    playSchoolItem: {
        city: "",
        houseNumber: "",
        name: "",
        id: "",
        postcode: "",
        street: "",
    },
    refreshPlaySchool: () => {
        throw new Error("User not set")
    },
    hasKita: false,
    addNewPlaySchool: () => {
        throw new Error("Users not set")
    },
    addPlaySchoolUserConnection: () => {
        throw new Error("Users not set")
    },
    getVisibility: () => {
        throw new Error("Kita not set")
    },
})

const PlaySchoolProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)

    const [kitaVisibility, setKitaVisibility] = useState<KitaVisibility>({});
    const [hasKita, setHasKita] = useState(false)
    const [playSchoolItem, setPlaySchoolItem] = useState<PlaySchoolItem>({
        city: "",
        houseNumber: "",
        name: "",
        id: "",
        postcode: "",
        street: "",
    })

    const addNewPlaySchool = (data: {}) => {
        callBackend('/api/kita/addkita', 'POST', data)
            .then((json: PlaySchoolItem) => {
                setPlaySchoolItem(json)
                setHasKita(true)
            })
    }

    const refreshPlaySchool = () => {
        callBackend('/api/kita/getkita', 'GET', {})
            .then((json: PlaySchoolItem) => {
                setHasKita(true)
                setPlaySchoolItem(json)
            })
            .catch(() => {
                setHasKita(false)
                setPlaySchoolItem({city: "", houseNumber: "", id: "", name: "", postcode: "", street: ""})
            })
    }

    const addPlaySchoolUserConnection = (userId: string, playSchoolId: string, userRole: string) => {
        const data = {
            userId: userId,
            kitaId: playSchoolId,
            userRole: userRole,
        }
        callBackend("/api/kita/addkitauserconnector", 'POST', data)
    }

    const getVisibility = (kitaId: string) => {
        callBackend("/api/kita/getVisibility/" + kitaId, 'GET', {})
            .then((json:[]) => {
                const visibility:KitaVisibility = {}
                json.forEach((item:string) => {
                    visibility[item]=!visibility[item]
                })
                setKitaVisibility(visibility);
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <PlaySchoolCom.Provider
            value={{hasKita, kitaVisibility, setKitaVisibility, addNewPlaySchool, playSchoolItem, refreshPlaySchool, addPlaySchoolUserConnection, getVisibility}}>
            {children}
        </PlaySchoolCom.Provider>
    )

}

export default PlaySchoolProvider