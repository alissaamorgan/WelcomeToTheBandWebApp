import { useEffect, useState} from "react";
import phone from '../assets/Phone.png';
import phoneTopBar from '../assets/Topbarphone.png';
import phoneSettings from '../assets/phoneSettings.png';
import phoneNotification from '../assets/Notification.png';
import {getFakeTime, getFakeDate, getMoonandSunImage} from './timer.js';

export const DynamicDebuffsTable = () => {
    const debuffs = [
        { time: "12:00:00", bodyPlacement: 'Ankle', affect: 'Speed Reduction', penalty: -2 },
        { time: "6:50:00", bodyPlacement: 'Ankle', affect: 'Dex Reduction', penalty: -2 }
    ];
    return (
        <table>
            <thead>
                <tr>
                    <th colSpan="4"><h3>Debuffs</h3></th>
                </tr>
            </thead>
            <tbody>
                {debuffs.map((debuff, index) => {
                    return(
                        <tr key={index}>
                            <td key={debuff.time}>{debuff.time}</td>
                            <td key={debuff.bodyPlacement}>{debuff.bodyPlacement}</td>
                            <td key={debuff.affect}>{debuff.affect}</td>
                            <td key={debuff.penalty}>{debuff.penalty}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export function PhoneRender({ notifications = [] }){
    const[timerBroadcast, settimerBroadcast] = useState(null);

    useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${protocol}//${window.location.hostname}:3001`;
        const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        console.log("WebSocket connected");
    };

    ws.onmessage = async (event) => {
        console.log("WebSocket message received:", event.data);
        try{
            const data = JSON.parse(event.data);

            if(data.type === "fake-time-broadcast"){
                settimerBroadcast(data);
            }
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
    return(
        <div className="characterSheetPhone">
            <img className = "phone" src={phone} alt="Phone"></img>
            <div className="phoneBackground">
                <img className = "phoneSettingsButton" src={phoneSettings} alt="phoneSettings" onClick={() => alert("phoneSettings")}></img>
                <img className = "phoneTopBar" src={phoneTopBar} alt="PhoneTopBar"></img>
                <div className="characterSheetPhoneDate">
                    <div className="phoneDate">{getFakeDate(timerBroadcast?.fakeUnix ?? 0)}</div>
                    <div className="phoneTime">
                        <img className = "sunAndMoon" alt="sunAndMoon" src={getMoonandSunImage(timerBroadcast?.fakeUnix ?? 0)}></img>
                        {getFakeTime(timerBroadcast?.fakeUnix ?? 0)}
                    </div>
                </div>
                <div className="phoneNotificationContainer">
                    {notifications.map((notification) => (
                        <div className = "phoneNotification" key={notification.id}>
                            <div className="phoneNotificationText">
                                <div className="phoneNotificationApp">{notification.app}</div>
                                <div className="phoneNotificationTitle">{notification.title}</div>
                                <div className="phoneNotificationMessage">{notification.message}</div>
                            </div>
                            <img className = "phoneNotificationImage" src={phoneNotification} alt="phoneNotificationImage"></img>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DynamicDebuffsTable;