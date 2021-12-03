import React from 'react';
import style from './card.module.scss';

export type CardPropsType = {
    newsSite: string
    title: string
    summary: string
    url: string
    imageUrl: string
    key: number
    id: number
}

const Card = (props: CardPropsType) => {
    return (
        <div className={style.card}>
            <h1>{props.newsSite}</h1>
            <a href={props.url}>
                <h2>{props.title}</h2>
            </a>
            <p>{props.summary}</p>
            <img src={props.imageUrl} alt="img"/>
            <span>"Id: " {props.id}</span>
        </div>
    )
}


export default Card;