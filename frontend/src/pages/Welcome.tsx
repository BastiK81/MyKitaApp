import {useContext, useEffect} from "react";
import {KitaCom} from "../services/KitaProvider";
import {UserCom} from "../services/UserProvider";

const Welcome = () => {

    const {refreshKita, kitaItem} = useContext(KitaCom);
    const {refreshUser} = useContext(UserCom)

    useEffect(() => {
        refreshUser(false)
        refreshKita()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {kitaItem.name}
        </>
    )
}

export default Welcome