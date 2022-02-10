import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent,} from "@mui/material";
import * as React from "react";
import {useContext, useEffect} from "react";
import {UserCom, userVisibility} from "../../services/UserProvider";


const UserSettings = () => {

    const {getVisibility, visibility, setUserVisibility} = useContext(UserCom);


    useEffect(() => {
        getVisibility()
        // eslint-disable-next-line
    }, []);

    const handleChangeVisibility = (event: SelectChangeEvent) => {
        setUserVisibility(event.target.value);
    }

    return (
        <FormControl>
            <InputLabel id="rolePicker-label">Role</InputLabel>
            <Select
                labelId="rolePicker-label"
                id="rolePicker"
                label="Role"
                value={visibility}
                onChange={handleChangeVisibility}
            >
                {userVisibility.map((role) => {
                    return (
                        <MenuItem id={role}
                                  value={role}>{role}</MenuItem>
                    )
                })}
            </Select>
            <FormHelperText>Be careful</FormHelperText>
        </FormControl>

    )

}

export default UserSettings