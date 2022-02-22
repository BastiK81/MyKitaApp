import {Button, Container, Grid, Stack, Typography} from "@mui/material";
import Page from "../../components/Page";
import {Link as RouterLink} from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import {Icon} from '@iconify/react';
import BlogPostCard from "./BlogPostCard";

const POSTS = [
    {
        id: '1',
        cover: 'https://de.dreamstime.com/stockfoto-schulin-handarbeit-machen-image62046536',
        title: 'Wir waren auf dem Spielplatz',
        view: 5, comment: 6, share: 7,
        author: {
            name: 'Walter',
            avatar: 'https://'
        }
        , createdAt: new Date()
    },
    {
        id: '2',
        cover: 'frontend/src/pages/blogPictures/basteln.jpg',
        title: 'Wir haben gebastelt',
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
        id: '3', cover: 'basteln.jpg', title: 'Bitte an die Regenkleidung denken', view: 5, comment: 6, share: 7,
        author: {
            name: 'Walter',
            avatar: 'https://'
        }
        , createdAt: new Date()
    },

]

const GroupInformation = () => {

    return (
        <Page title="Gruppen Information">
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

export default GroupInformation