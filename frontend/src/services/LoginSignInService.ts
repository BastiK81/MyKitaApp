import {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";

export interface ILoginSignInService {
    loginRegister: (url: string, data: {}) => void,
}

const LoginSignInService = (setJwt: Dispatch<SetStateAction<string>>, getUserInformation: () => void) => {

    const STORAGE_KEY = 'JWT';
    const navigate = useNavigate();

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

    const loginRegister = (url:string, data: {}) => {
        auth(url, data)
            .then(text => {
                console.log('wait')
                localStorage.setItem(STORAGE_KEY, text)
                setJwt(text)
                getUserInformation()
                navigate('/main', {replace: true});
            })
            .catch(() => {
                navigate('/404', {replace: true});
            });
    }

    return {
        loginRegister
    }
}

export default LoginSignInService