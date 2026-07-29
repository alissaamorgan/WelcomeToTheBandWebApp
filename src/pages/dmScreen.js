import React from "react";
import './pages.css';
import {getFakeTime, getFakeDate, getMoonAndSun} from './timer.js'

const DmScreen = () => {
    return (
        <div>
            Date = {getFakeDate()}
            <h1>Time = {getFakeTime()}</h1>
            Moon = {getMoonAndSun()}
        </div>
    );
};

export default DmScreen;