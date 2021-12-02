import React from 'react';
import style from './main.module.scss';
import {Button} from '@material-ui/core';
import LoginIcon from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ButtonGroup from "@material-ui/core/ButtonGroup";

// import PropTypes from 'prop-types';

// Main.propTypes = {
//
// };


const Main = () => {
    return (
        <div className={style.main}>
            <ButtonGroup
                variant="contained">
                <Button
                    endIcon={<LoginIcon/>}
                    color="primary">
                    Login
                </Button>
                <Button
                    startIcon={<LogoutIcon/>}
                    color="secondary">
                    Logout
                </Button>
            </ButtonGroup>
            <ButtonGroup variant="contained" orientation="vertical">
                <Button
                    endIcon={<LoginIcon/>}
                    color="primary">
                    Login
                </Button>
                <Button
                    startIcon={<LogoutIcon/>}
                    color="secondary">
                    Logout
                </Button>
            </ButtonGroup>
        </div>
    );
};


export default Main;