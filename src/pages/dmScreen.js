import { useEffect, useState, React } from "react";
import './pages.css';
import {getFakeTime, getFakeTimeWithSeconds, getFakeDate, getMoonAndSun} from './timer.js'
import {StartClock, StopClock} from "../api/useApiSocket.js";

const DmScreen = () => {
    const[timerBroadcast, settimerBroadcast] = useState(null);
    useEffect(() => {
    console.log("DmScreen mounted");

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${protocol}//${window.location.hostname}:3001`;
        const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
        console.log("WebSocket message received:", event.data);

        try{
            const data = JSON.parse(event.data);
            settimerBroadcast(data);
        }catch (error){
            console.error("Could not parse timerBroadcast:", error);
        }
    };

    ws.onerror = (event) => {
        console.error("WebSocket error:", event);
    };

    ws.onclose = (event) => {
        console.log(
        "WebSocket closed:",
        "code =", event.code,
        "reason =", event.reason,
        "clean =", event.wasClean
        );
    };

    return () => {
        console.log("Closing WebSocket");
        ws.close();
    };
    }, []);

    return (
        <div>
            Date = {getFakeDate(timerBroadcast?.fakeUnix ?? 0)}
            <h1>Time = {getFakeTimeWithSeconds(timerBroadcast?.fakeUnix ?? 0)}</h1>
            Moon = {getMoonAndSun(timerBroadcast?.fakeUnix ?? 0)}
            <button onClick={() => StartClock()}> start </button>
            <button onClick={() => StopClock()}> stop </button>
        </div>
    );
};

export default DmScreen;