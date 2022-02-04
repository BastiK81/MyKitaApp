import {Dispatch, SetStateAction, useState} from "react";

export interface IUserInformation {
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    lastName: string,
    setLastName: Dispatch<SetStateAction<string>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>
    getUserInformation: () => void
}

const UserInformationService = (jwt:string, getKitaInformation: () => void) => {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    async function getInformation() {
        const response = await fetch("/api/user/getuserinformation", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        })
        if (!response.ok) {
            throw new Error("HTTP status " + response.status);
        }
        return response.json();
    }

    const getUserInformation = () => {
        getInformation()
        .then(data => {
            setName(data.firstName)
            setLastName(data.lastName)
            setEmail(data.email)
            getKitaInformation()
        })
        .catch(() => {
        });
    }

    return {
        name,
        setName,
        lastName,
        setLastName,
        email,
        setEmail,
        getUserInformation
    }
}

export default UserInformationService