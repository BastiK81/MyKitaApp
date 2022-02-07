import React, {createContext, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";

export interface IPlaySchoolProvider {
    hasKita: boolean,
    refreshPlaySchool: () => void,
    playSchoolItem: PlaySchoolItem
    addNewPlaySchool: (data: {}) => void,
    addPlaySchoolUserConnection: (userId: string, playSchoolId: string, userRole: string) => void,
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
    playSchoolItem: {
        city: "",
        houseNumber: "",
        name: "",
        id: "",
        postcode: "",
        street: ""
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
})

const PlaySchoolProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)

    const [hasKita, setHasKita] = useState(false)
    const [playSchoolItem, setPlaySchoolItem] = useState<PlaySchoolItem>({
        city: "",
        houseNumber: "",
        name: "",
        id: "",
        postcode: "",
        street: ""
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
                setPlaySchoolItem(json)
                setHasKita(true)
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

    return (
        <PlaySchoolCom.Provider
            value={{hasKita, addNewPlaySchool, playSchoolItem, refreshPlaySchool, addPlaySchoolUserConnection}}>
            {children}
        </PlaySchoolCom.Provider>
    )

}

export default PlaySchoolProvider