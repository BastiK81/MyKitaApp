import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useState} from "react";
import {IUserInformation} from "./UserInformationService";

export interface IKitaInformationService{
    hasKita: boolean,
    setHasKita: Dispatch<SetStateAction<boolean>>,
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    street: string,
    setStreet: Dispatch<SetStateAction<string>>,
    houseNumber: string,
    setHouseNumber: Dispatch<SetStateAction<string>>,
    postcode: string,
    setPostcode: Dispatch<SetStateAction<string>>,
    city: string,
    setCity: Dispatch<SetStateAction<string>>,
    addKita: (data:{}) => void
    getKita: () => void
}

const KitaInformationService = (jwt:string) => {

    const navigate = useNavigate();

    const [hasKita, setHasKita] = useState(false)
    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [postcode, setPostcode] = useState('')
    const [city, setCity] = useState('')

    async function getInformation(url:string, method:string) {
        const response = await fetch(url,
            {
                method: method,
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

    async function callBackend(url:string, data:{}, method:string) {
        const response = await fetch(url,
            {
                method: method,
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

    const addKita = (data:{}) => {
        callBackend('/api/addkita', data, 'POST')
            .then(json => {
                setHasKita(true)
                setName(json.name)
                setStreet(json.street)
                setCity(json.city)
                setPostcode(json.postcode)
                setHouseNumber(json.houseNumber)
            })
            .catch(() => {
                navigate('/404', { replace: true });
            });
    }

    const getKita = () => {
        getInformation('/api/getkita', 'GET')
            .then(json => {
                setHasKita(true)
                setName(json.name)
                setStreet(json.street)
                setCity(json.city)
                setPostcode(json.postcode)
                setHouseNumber(json.houseNumber)
            })
            .catch((error) => {
                console.log(error)
                navigate('/404', { replace: true });
            });
    }

    return{
        hasKita,
        setHasKita,
        name,
        setName,
        street,
        setStreet,
        houseNumber,
        setHouseNumber,
        postcode,
        setPostcode,
        city,
        setCity,
        addKita,
        getKita
    }
}

export default KitaInformationService