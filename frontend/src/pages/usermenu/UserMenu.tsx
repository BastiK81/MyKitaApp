import {Container, Grid, Stack, TextField} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {KindCom} from "../../services/KinderProvider";
import {UserCom} from "../../services/UserProvider";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {GroupCom} from "../../services/GrouopProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DatePicker} from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const UserMenu = () => {

    const {user} = useContext(UserCom);
    const {getKinderToUser, kindItems} = useContext(KindCom);
    const {groupItem, getGroupById} = useContext(GroupCom);

    useEffect(() => {
        getKinderToUser(user.id)
        // eslint-disable-next-line
    }, []);

    const [dateVon, setDateVon] = useState<Date | null>(new Date());
    const [dateBis, setDateBis] = useState<Date | null>(new Date());

    const formatDate = (datum: Date) => {
        const date = new Date(datum)
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }

    const getGroupName = (groupId: string) => {
        getGroupById(groupId)
        return groupItem.name
    }

    const handleAbmelden = () => {
        console.log("Abmelden")
    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    {kindItems !== null && kindItems.map((kind) => {
                        return (
                            <Card key={kind.firstName} sx={{minWidth: 275}}>
                                <Stack direction="row" spacing={2}>
                                    <Grid item xs={4}>
                                        <Stack justifyContent="flex-start"
                                               alignItems="flex-start" spacing={2}>
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    {kind.firstName + ' ' + kind.lastName}
                                                </Typography>
                                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                                    {formatDate(kind.dateOfBirth)}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Gruppe:
                                                    <br/>
                                                    {getGroupName(kind.groupId)}
                                                </Typography>
                                            </CardContent>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CardContent>
                                            <Stack justifyContent="flex-end" spacing={2}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="Abmelden von"
                                                        openTo="year"
                                                        views={['year', 'month', 'day']}
                                                        value={dateVon}
                                                        onChange={(newValue) => {
                                                            setDateVon(newValue)
                                                            setDateBis(newValue)
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="Abmelden bis"
                                                        openTo="year"
                                                        views={['year', 'month', 'day']}
                                                        value={dateBis}
                                                        onChange={(newValue) => setDateBis(newValue)}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                <CardActions>
                                                    <Button onClick={handleAbmelden} size="small">Abmelden</Button>
                                                </CardActions>
                                            </Stack>
                                        </CardContent>
                                    </Grid>
                                </Stack>
                            </Card>
                        )
                    })}
                </Grid>
            </Grid>
        </Container>
    )

}

export default UserMenu