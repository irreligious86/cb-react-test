import React from 'react';
import style from './card-wrapper.module.scss';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";


export type CardWrapperPropsType = {
    newsSite: string
    title: string
    summary: string
    url: string
    imageUrl: string
    key: number
    id: number
}

type CardPropsType = {

}

const CardWrapper = (props: CardWrapperPropsType) => {

    return (
        <div className={style.card}>
            <Card>
                <a href={props.url}>
                <CardMedia
                    component="img"
                    height="340"
                    image={props.imageUrl}
                    alt="lost img"
                /></a>
                <CardContent>
                    <a href={props.url}>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.newsSite}
                    </Typography>
                    </a>
                    <Typography variant="body2" >
                        {props.summary}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box ml="auto">
                        <Button size="small">Read More</Button>
                    </Box>
                </CardActions>
            </Card>
        </div>
    )
}


export default CardWrapper;