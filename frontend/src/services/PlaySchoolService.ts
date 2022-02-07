import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useState} from "react";

export interface PlaySchoolServiceImpl {
    hasKita: boolean,
    setHasKita: Dispatch<SetStateAction<boolean>>,
    playSchoolItem: PlaySchoolItem,
    setPlaySchoolItem: Dispatch<SetStateAction<PlaySchoolItem>>
    addKita: (data: {}) => void
    getKita: () => void
}

interface PlaySchoolItem {
    id: string,
    name: string,
    street: string,
    houseNumber: string,
    postcode: string,
    city: string,
}

const PlaySchoolService = (callBackend: (url: string, requestMethod: string, data: {}) => Promise<any>) => {

    const navigate = useNavigate();

    const [playSchoolItem, setPlaySchoolItem] = useState<PlaySchoolItem>({
        city: "",
        houseNumber: "",
        name: "",
        id: "",
        postcode: "",
        street: ""
    })
    const [hasKita, setHasKita] = useState(false)

    const addKita = (data: {}) => {
        callBackend('/api/kita/addkita', 'POST', data)
            .then((json: PlaySchoolItem) => {
                setPlaySchoolItem(json)
                setHasKita(true)
            })
    }

    const getKita = () => {
        callBackend('/api/kita/getkita', 'GET', {})
            .then((json: PlaySchoolItem) => {
                setPlaySchoolItem(json)
                setHasKita(true)
            })
    }

    return {
        hasKita,
        setHasKita,
        playSchoolItem,
        setPlaySchoolItem,
        addKita,
        getKita
    }
}

export default PlaySchoolService