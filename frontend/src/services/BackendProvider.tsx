import React, {createContext, ReactElement, useState} from "react";
import {useNavigate} from "react-router-dom";

export interface IBackendContext {
    jwt: string,
    setNewJwt: (jwt: string) => void,
    logout: () => void,
    callBackend: (url: string, requestMethod: string, data: {}) => Promise<any>
    loginRegister: (url: string, data: {}) => void
}

export const BackendCom = createContext<IBackendContext>({
    jwt: '',
    logout: () => {
        throw new Error("Login not initialized")
    },
    setNewJwt: () => {
        throw new Error("Login not initialized")
    },
    callBackend: (url: string, requestMethod: string, data: {}) => {
        throw new Error("Cannot Call Backend")
    },
    loginRegister: (url: string, data: {}) => {
        throw new Error("Cannot Call Backend")
    }
})

const BackendProvider = ({children}: { children: ReactElement<any, any> }) => {

    const navigate = useNavigate();

    const STORAGE_KEY = 'JWT';

    const [jwt, setJwt] = useState<string>(localStorage.getItem(STORAGE_KEY) || "")

    const setNewJwt = (jwt: string) => {
        setJwt(jwt)
    }

    async function callBackend(url: string, requestMethod: string, data: {}) {
        const requestInit: RequestInit = {
            method: requestMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt,
            }
        }
        if (requestMethod === 'POST') {
            requestInit.body = JSON.stringify(data)
        }
        const response = await fetch(url, requestInit)
        if (!response.ok) {
            throw new Error("HTTP status " + response.status);
        }
        return response.json();
    }

    async function auth(url: string, data: {}) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error("HTTP status " + response.status);
        }
        return response.text();
    }

    const loginRegister = (url: string, data: {}) => {
        auth(url, data)
            .then(text => {
                setNewJwt(text)
                navigate('/main/welcome', {replace: true});
            })
            .catch(() => {
                setNewJwt('')
                navigate('/404', {replace: true});
            });
    }

    const logout = () => {
        setNewJwt('')
        navigate('/login', {replace: true});
    }

    return (
        <BackendCom.Provider value={{jwt, setNewJwt, logout, callBackend, loginRegister}}>
            {children}
        </BackendCom.Provider>
    )
}

export default BackendProvider