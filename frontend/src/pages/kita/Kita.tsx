import Page from "../../components/Page";
import {Box, Container, Stack, TextField, Typography} from "@mui/material";
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {LoadingButton} from "@mui/lab";
import {useContext, useEffect} from "react";
import {KitaCom} from "../../services/KitaProvider";
import KitaVisibilitySettings from "./KitaVisibilitySettings";

const Kita = () => {

    const {refreshKita, kitaItem, hasKita, addNewKita} = useContext(KitaCom)

    useEffect(() => {
        refreshKita()
        // eslint-disable-next-line
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
            kitaName: kitaItem.name,
            street: kitaItem.street,
            houseNumber: kitaItem.houseNumber,
            postcode: kitaItem.postcode,
            city: kitaItem.city,
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            addNewKita({
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
                                disabled={hasKita}
                            />

                            <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Street"
                                    {...getFieldProps('street')}
                                    error={Boolean(touched.street && errors.street)}
                                    helperText={touched.street && errors.street}
                                    disabled={hasKita}
                                />

                                <TextField
                                    fullWidth
                                    label="House Number"
                                    {...getFieldProps('houseNumber')}
                                    error={Boolean(touched.houseNumber && errors.houseNumber)}
                                    helperText={touched.houseNumber && errors.houseNumber}
                                    disabled={hasKita}
                                />

                            </Stack>

                            <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Postcode"
                                    {...getFieldProps('postcode')}
                                    error={Boolean(touched.postcode && errors.postcode)}
                                    helperText={touched.postcode && errors.postcode}
                                    disabled={hasKita}
                                />
                                <TextField
                                    fullWidth
                                    label="City"
                                    {...getFieldProps('city')}
                                    error={Boolean(touched.city && errors.city)}
                                    helperText={touched.city && errors.city}
                                    disabled={hasKita}
                                />

                            </Stack>

                            {!hasKita && <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                            >
                                Create Kita
                            </LoadingButton>}
                        </Stack>

                        {hasKita && <KitaVisibilitySettings/>}

                    </Form>
                </FormikProvider>
            </Container>
        </Page>
    )

}

export default Kita