import {useContext} from "react";
import {GroupCom} from "../../services/GrouopProvider";
import {Box, Container, Grid, Stack, TextField, Typography} from "@mui/material";
import Page from "../../components/Page";
import {LoadingButton} from "@mui/lab";
import GroupKinderList from "./GroupKinderList";

const GroupSettings = () => {

    const {groupItem} = useContext(GroupCom);

    return (
        <Page title="Group Settings">
            <Container maxWidth="xl">
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Group Settings for Group: {groupItem.name}</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Gruppen Name"
                                value={groupItem.name}
                            />
                            <TextField
                                fullWidth
                                label="Anzahl Kinder"
                                disabled={true}
                                value={groupItem.kinder.length}
                            />

                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Save Settings
                            </LoadingButton>
                        </Stack>
                    </Grid>
                    <Grid item xs={24} sm={12} md={6}>
                        <GroupKinderList/>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default GroupSettings