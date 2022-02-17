import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {
    Box,
    Card,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Page from "../../components/Page";
import {DatePicker, LoadingButton} from "@mui/lab";
import {KindCom} from "../../services/KinderProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {GroupCom} from "../../services/GrouopProvider";
import Eltern from "./Eltern";

const KindSettings = () => {

    const {kind, updateKind} = useContext(KindCom);
    const {refreshAllGroups, groupItems} = useContext(GroupCom);

    useEffect(() => {
        setFirstName(kind.firstName)
        setLastName(kind.lastName)
        setSelectedGroup(kind.groupId)
        setDateOfBirth(kind.dateOfBirth)
        refreshAllGroups(kind.kitaId)
        // eslint-disable-next-line
    }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date());
    const [selectedGroup, setSelectedGroup] = React.useState('');

    const handleCLickSave = () => {
        updateKind({
            id: kind.id,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            parents: [],
            kitaId: kind.kitaId,
            groupId: selectedGroup
        })
    }

    return (
        <Page title="Group Settings">
            <Container maxWidth="xl">
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Settings for
                        Child: {kind.firstName + ' ' + kind.lastName}</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <Stack spacing={3} padding={3}>
                                <TextField
                                    key={'Vorname'}
                                    fullWidth
                                    label="Vorname"
                                    value={firstName}
                                    type={'text'}
                                    onChange={(newValue) => {
                                        setFirstName(newValue.target.value)
                                    }}
                                />
                                <TextField
                                    key={"Nachname"}
                                    fullWidth
                                    label="Nachname"
                                    value={lastName}
                                    type={'text'}
                                    onChange={(newValue) => {
                                        setLastName(newValue.target.value)
                                    }}
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        disableFuture
                                        label="Date of Birth"
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        value={dateOfBirth}
                                        onChange={(newValue) => {
                                            setDateOfBirth(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                                <FormControl>
                                    <InputLabel id="group-label">Group</InputLabel>
                                    <Select
                                        labelId="group-label"
                                        id="group-helper"
                                        label="Group"
                                        type={'text'}
                                        value={selectedGroup}
                                        onChange={(event) => {
                                            setSelectedGroup(event.target.value)
                                        }}
                                    >
                                        {groupItems.map((item) => {
                                            return (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>

                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={handleCLickSave}
                                >
                                    Save Settings
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid item xs={24} sm={12} md={6}>
                        <Eltern kind={kind}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <Stack spacing={3} padding={3}>
                                Educators
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default KindSettings