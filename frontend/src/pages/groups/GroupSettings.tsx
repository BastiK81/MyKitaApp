import {useContext} from "react";
import {GroupCom} from "../../services/GrouopProvider";
import {Box, Container, Grid, Typography} from "@mui/material";
import Page from "../../components/Page";

const GroupSettings = () => {

    const {groupSettingsId} = useContext(GroupCom);

    return (
        <Page title="Dashboard | Minimal-UI">
            <Container maxWidth="xl">
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Group Settings for Group: {groupSettingsId}</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>

                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default GroupSettings