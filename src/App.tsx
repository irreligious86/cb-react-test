import React from "react";
import style from "./App.module.scss";
import Main from "./components/Main/main";




const App: React.FC = () => {

    return (
        <div className={style.App}>
            <Main />
        </div>
    );
}

export default App;
