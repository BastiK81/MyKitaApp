import {Stack, Typography} from "@mui/material";
import * as React from "react";

interface IUserConnectionTitle {
    title: string
}

const ConnectionTitle = (props: IUserConnectionTitle) => {

    const {title} = props

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} spacing={2}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
        </Stack>
    )
}

export default ConnectionTitle