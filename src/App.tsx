import React, {DependencyList, useCallback, useEffect, useRef, useState} from "react";
import style from "./App.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import {LayersClearOutlined, PlayCircleFilledOutlined, SearchOutlined} from "@material-ui/icons";
import {
    AppBar,
    Button,
    Card, CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    App: {},
    appBar: {
        opacity: 0.99,
        backgroundColor: "rgba(200, 200, 200, .7)"
    },
    searchButton: {
        marginRight: theme.spacing(1)
    },
    title: {
        flexGrow: 1,
        color: "black"
    },
    subtitle: {
        flexGrow: 1,
        color: "black",
        justifyContent: "space-around",
        marginLeft: "auto"
    },
    mainContent: {},
    mainButtons: {},
    cardGrid: {
        position: "relative",
        padding: theme.spacing(3),
        marginTop: theme.spacing(10)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%"
    },
    cardContent: {
        flexGrow: 1
    },
    cardTitle: {
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
        overflow: "hidden"
    },
    cardSummary: {
        display: "-webkit-box",
        "-webkit-line-clamp": 5,
        "-webkit-box-orient": "vertical",
        overflow: "hidden"
    },
    cardActions: {
        marginTop: "auto",
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        alignItems: "center",
        justifyItems: "start"
    }
}));

type CardPropsType = {
    updatedAt: string
    newsSite: string
    title: string
    summary: string
    url: string
    imageUrl: string
    key: number
    id: number
}

const App: React.FC = () => {
    const defaultApi: string = "https://api.spaceflightnewsapi.net/v3/articles";

    const [api, setApi] = useState("https://api.spaceflightnewsapi.net/v3/articles?title_contains=usa");
    const [cards, setCards] = useState([]);
    const [input, setInput] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');


    const compareString = (fragment: string, text: string): boolean => {
        return text.indexOf(fragment,  0) > -1 ;
    }

    const filterCardsByTitle = (fragment: string) => {
        setCards(cards.filter((item: any) => compareString(input, item.title)))
    }

    const filterCardsBySummary = (fragment: string) => {
        setCards(cards.filter((item: any) => compareString(input, item.summary)))
    }

     type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

    function useTimeoutFn(fn: Function, ms: number = 0): UseTimeoutFnReturn {
        const ready = useRef<boolean | null>(false);
        const timeout = useRef<ReturnType<typeof setTimeout>>();
        const callback = useRef(fn);

        const isReady = useCallback(() => ready.current, []);

        const set = useCallback(() => {
            ready.current = false;
            timeout.current && clearTimeout(timeout.current);

            timeout.current = setTimeout(() => {
                ready.current = true;
                callback.current();
            }, ms);
        }, [ms]);

        const clear = useCallback(() => {
            ready.current = null;
            timeout.current && clearTimeout(timeout.current);
        }, []);

        // update ref when function changes
        useEffect(() => {
            callback.current = fn;
        }, [fn]);

        // set on mount, clear on unmount
        useEffect(() => {
            set();

            return clear;
        }, [ms]);

        return [isReady, clear, set];
    }

     type UseDebounceReturn = [() => boolean | null, () => void];

     function useDebounce(
        fn: Function,
        ms: number = 0,
        deps: DependencyList = []
    ): UseDebounceReturn {
        const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

        useEffect(reset, deps);

        return [isReady, cancel];
    }

    const [, cancel] = useDebounce(
        () => {
            // setCards(cards.filter((item: any) => compareString(input, item.title)));
            setApi(defaultApi);
            setDebouncedValue(input);
        },
        1500,
        [input]
    );


    const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
            filterCardsByTitle(e.target.value);
            filterCardsBySummary(e.target.value);
    }

    const BlurHandler = () => {setInput('')}

    const SearchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {console.log('SearchHandler', e)}

    useEffect(() => {
        fetch(api)
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                setCards(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const classes = useStyles();
    return (
        <div className={classes.App}>
            <AppBar className={classes.appBar}>
                <Container>
                    <Typography className={classes.title}>Filter by keywords</Typography>
                    <Toolbar>
                        <TextField
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            value={input}
                            onChange={ChangeHandler}
                            onBlur={BlurHandler}
                        />
                        <IconButton
                            className={classes.searchButton}
                            aria-label="search"
                            onClick={SearchHandler}
                        >
                            <SearchOutlined/>
                        </IconButton>
                        <Typography className={classes.subtitle}>Results: {cards.length}</Typography>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {cards.map((card: CardPropsType) => {
                        return (
                            <>
                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={card.imageUrl}
                                            title={card.title}
                                        ></CardMedia>
                                        <CardContent className={classes.cardContent}>
                                            <Typography>{card.updatedAt}</Typography>
                                            <Typography>{card.newsSite}</Typography>
                                            <Typography
                                                className={classes.cardTitle}
                                                variant="h5"
                                                gutterBottom
                                            >
                                                {card.title}
                                            </Typography>
                                            <Typography className={classes.cardSummary}>
                                                {card.summary}
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.cardActions}>
                                            <Button size="small" color="primary">
                                                Read more
                                            </Button>
                                            <LayersClearOutlined/>
                                            <PlayCircleFilledOutlined/>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
};

export default App;