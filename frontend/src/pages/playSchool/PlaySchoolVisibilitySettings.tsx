import {useContext, useEffect, useState} from "react";
import {List, ListItem, ListItemIcon, ListItemText, ListSubheader, Stack, Switch} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import PublicIcon from "@mui/icons-material/Public";
import {KitaVisibility, PlaySchoolCom, KitaVisibilityEnums} from "../../services/PlaySchoolProvider";

const PlaySchoolVisibilitySettings = () => {

    const {playSchoolItem, getVisibility, kitaVisibility} = useContext(PlaySchoolCom);

    useEffect(() => {
        getVisibility(playSchoolItem.id)
        setChecked(kitaVisibility)
        // eslint-disable-next-line
    }, []);

    const [checked, setChecked] = useState<KitaVisibility>({});

    const handleToggle = (value: KitaVisibilityEnums) => () => {
        console.log(checked)
        const newChecked = {...checked};
        newChecked[value]=!newChecked[value]
        setChecked(newChecked);
    };

    return (
        <Stack spacing={3}>

            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                subheader={<ListSubheader>Kita Visibility</ListSubheader>}
            >
                <ListItem>
                    <ListItemIcon>
                        <HouseIcon/>
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-playSchool" primary="Kita"/>
                    <Switch
                        edge="end"
                        onChange={() => handleToggle('KITA')}
                        checked={checked['KITA']}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-playSchool',
                        }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PublicIcon/>
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-public" primary="Public"/>
                    <Switch
                        edge="end"
                        onChange={() => handleToggle('PUBLIC')}
                        checked={checked['PUBLIC']}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-public',
                        }}
                    />
                </ListItem>
            </List>
        </Stack>
    )

}

export default PlaySchoolVisibilitySettings