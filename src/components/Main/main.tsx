import React, {useEffect, useState} from 'react';
import style from './main.module.scss';

import Card from '../Card/card';
import {CardPropsType} from "../Card/card";



type MainPropsType = {

}



const Main = (props: MainPropsType) => {

    const [arr, setArr] = useState([]);

    useEffect(() => {
        fetch("https://api.spaceflightnewsapi.net/v3/articles")
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                console.log(data);
                console.log(data[0].imgUrl)
                setArr(data);
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return (
        <div className={style.main}>
            {arr.map((item: CardPropsType) => <Card
                newsSite={item.newsSite}
                title={item.title}
                summary={item.summary}
                url={item.url}
                imageUrl={item.imageUrl}
                key={item.id}
                id={item.id}
            />)}
        </div>
    );
};


export default Main;