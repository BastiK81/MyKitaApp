import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';

import {alpha, styled} from '@mui/material/styles';
import {Card, CardContent, Grid, Link, Typography} from '@mui/material';
import {fDate} from "../../components/utils/formatTime";
// utils


//

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
    height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'
});


const CoverImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
    post: PropTypes.object.isRequired,
    index: PropTypes.number
};

// @ts-ignore
export default function BlogPostCard({post, index}) {
    const {cover, title, createdAt} = post;
    const latestPostLarge = index === 0;
    const latestPost = index === 1 || index === 2;


    return (
        <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
            <Card sx={{position: 'relative'}}>
                <CardMediaStyle
                    sx={{
                        ...((latestPostLarge || latestPost) && {
                            pt: 'calc(100% * 4 / 3)',
                            '&:after': {
                                top: 0,
                                content: "''",
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                            }
                        }),
                        ...(latestPostLarge && {
                            pt: {
                                xs: 'calc(100% * 4 / 3)',
                                sm: 'calc(100% * 3 / 4.66)'
                            }
                        })
                    }}
                >

                    <CoverImgStyle src={cover}/>
                </CardMediaStyle>

                <CardContent
                    sx={{
                        pt: 4,
                        ...((latestPostLarge || latestPost) && {
                            bottom: 0,
                            width: '100%',
                            position: 'absolute'
                        })
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="caption"
                        sx={{color: 'text.disabled', display: 'block'}}
                    >
                        {fDate(createdAt)}
                    </Typography>

                    <TitleStyle
                        // @ts-ignore
                        to="#"
                        color="inherit"
                        variant="subtitle2"
                        underline="hover"
                        component={RouterLink}
                        sx={{
                            ...(latestPostLarge && {typography: 'h5', height: 60}),
                            ...((latestPostLarge || latestPost) && {
                                color: 'common.white'
                            })
                        }}
                    >
                        {title}
                    </TitleStyle>

                </CardContent>
            </Card>
        </Grid>
    );
}
