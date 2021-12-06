import React, {useEffect, useState} from 'react';
import CardWrapper from '../Card/card-wrapper';
import {CardWrapperPropsType} from "../Card/card-wrapper";



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
                setArr(data);
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return (
        <div>
            {arr.map((item: CardWrapperPropsType) => <CardWrapper
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