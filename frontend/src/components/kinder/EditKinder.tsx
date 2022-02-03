import {Button, Card, Stack, TextField, Toolbar} from "@mui/material";
import {DatePicker} from "@mui/lab";
import React, {FormEvent, useState} from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {Icon} from "@iconify/react";
import {styled} from "@mui/material/styles";
import {IKinderInformationService} from "../../services/KinderInformationService";
import {IGruppenInformationService} from "../../services/GruppenInformationService";

interface EditKinderProps {
    childs: IKinderInformationService,
    groups: IGruppenInformationService,
    kitaId: string
}

const EditKinder = (props:EditKinderProps) => {

    const RootStyle = styled(Toolbar)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2, 1, 2, 3)
    }));

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date());

    const addChild = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            parents: [''],
            kitaId: props.kitaId,
            groupId: ''
        }
        props.childs.addChild(data)
    }

    return (
        <Card>
            <RootStyle>
                <Stack spacing={3}>

                        <form onSubmit={addChild}>
                            <Stack direction="row" spacing={3}>
                        <TextField
                            required
                            id="outlined-required"
                            label="First Name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Last Name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<Icon icon="mdi:content-save" />}
                        >
                            Add Child
                        </Button>
                            </Stack>
                        </form>

                </Stack>

            </RootStyle>
        </Card>

    )

}

export default EditKinder