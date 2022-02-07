import Page from "../components/Page";
import {Box, Container, Stack, TextField, Typography} from "@mui/material";
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {LoadingButton} from "@mui/lab";
import {PlaySchoolServiceImpl} from "../services/PlaySchoolService";
import {useEffect} from "react";

interface AppProps {
    playSchoolService: PlaySchoolServiceImpl
}

const PlaySchool = (props: AppProps) => {

    const {playSchoolService} = props

    useEffect(() => {
        playSchoolService.getKita()
    }, []);


    const RegisterSchema = Yup.object().shape({
        kitaName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('name required'),
        street: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
        houseNumber: Yup.string().min(1, 'Too Short!').max(50, 'Too Long!'),
        postcode: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
        city: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    });

    const formik = useFormik({
        initialValues: {
            kitaName: playSchoolService.playSchoolItem.name,
            street: playSchoolService.playSchoolItem.street,
            houseNumber: playSchoolService.playSchoolItem.houseNumber,
            postcode: playSchoolService.playSchoolItem.postcode,
            city: playSchoolService.playSchoolItem.city,
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            playSchoolService.addKita({
                name: formik.getFieldProps('kitaName').value,
                street: formik.getFieldProps('street').value,
                houseNumber: formik.getFieldProps('houseNumber').value,
                postcode: formik.getFieldProps('postcode').value,
                city: formik.getFieldProps('city').value
            })
        },
    });

    const {errors, touched, handleSubmit, isSubmitting, getFieldProps} = formik;

    return (
        // @ts-ignore
        <Page title="Kita Übersicht">
            <Container maxWidth="xl">
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Hier ist deine Kita Übersicht</Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                    Kita Information
                </Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="name"
                                {...getFieldProps('kitaName')}
                                error={Boolean(touched.kitaName && errors.kitaName)}
                                helperText={touched.kitaName && errors.kitaName}
                                disabled={props.playSchoolService.hasKita}
                            />

                            <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Street"
                                    {...getFieldProps('street')}
                                    error={Boolean(touched.street && errors.street)}
                                    helperText={touched.street && errors.street}
                                    disabled={props.playSchoolService.hasKita}
                                />

                                <TextField
                                    fullWidth
                                    label="House Number"
                                    {...getFieldProps('houseNumber')}
                                    error={Boolean(touched.houseNumber && errors.houseNumber)}
                                    helperText={touched.houseNumber && errors.houseNumber}
                                    disabled={props.playSchoolService.hasKita}
                                />

                            </Stack>

                            <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Postcode"
                                    {...getFieldProps('postcode')}
                                    error={Boolean(touched.postcode && errors.postcode)}
                                    helperText={touched.postcode && errors.postcode}
                                    disabled={props.playSchoolService.hasKita}
                                />
                                <TextField
                                    fullWidth
                                    label="City"
                                    {...getFieldProps('city')}
                                    error={Boolean(touched.city && errors.city)}
                                    helperText={touched.city && errors.city}
                                    disabled={props.playSchoolService.hasKita}
                                />

                            </Stack>

                            {!props.playSchoolService.hasKita && <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                            >
                                Create Kita
                            </LoadingButton>}
                        </Stack>
                    </Form>
                </FormikProvider>
            </Container>
        </Page>
    )

}

export default PlaySchool