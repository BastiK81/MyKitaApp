import {useContext, useEffect} from "react";
import {PlaySchoolCom} from "../services/PlaySchoolProvider";
import {UserCom} from "../services/UserProvider";

const Welcome = () => {

    const {refreshPlaySchool, playSchoolItem} = useContext(PlaySchoolCom);
    const {refreshUser} = useContext(UserCom)

    useEffect(() => {
        refreshUser()
        refreshPlaySchool()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {playSchoolItem.name}
        </>
    )
}

export default Welcome