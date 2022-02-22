import {Button, Container, Grid, Stack, Typography} from "@mui/material";
import Page from "../../components/Page";
import {Link as RouterLink} from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import {Icon} from '@iconify/react';
import BlogPostCard from "./BlogPostCard";

const POSTS = [
    {
        id: '1',
        cover: 'img',
        title: 'Fortbildung am 23.03.2022 die Kita bleibt geschlossen',
        view: 5,
        comment: 6,
        share: 7,
        author: {
            name: 'Walter',
            avatar: 'https://'
        }
        ,
        createdAt: new Date()
    },
    {
        id: '2', cover: 'img', title: 'Wir planen eine Frühlingsfest', view: 5, comment: 6, share: 7,
        author: {
            name: 'Walter',
            avatar: 'https://'
        }
        , createdAt: new Date()
    },
    {
        id: '3', cover: 'img', title: 'Wochenspeiseplan', view: 5, comment: 6, share: 7,
        author: {
            name: 'Walter',
            avatar: 'https://'
        }
        , createdAt: new Date()
    },

]

const KitaInformation = () => {

    return (
        <Page title="Dashboard: Blog | Minimal-UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Allgemeine Informationen
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Icon icon={plusFill}/>}
                    >
                        New Post
                    </Button>
                </Stack>

                <Grid container spacing={3}>
                    {POSTS.map((post, index) => (
                        <BlogPostCard key={post.id} post={post} index={index}/>
                    ))}
                </Grid>
            </Container>
        </Page>
    )
}

export default KitaInformation