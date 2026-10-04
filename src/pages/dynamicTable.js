import { useEffect, useState} from "react";
import phone from '../assets/Blankphonesamecrop.PNG';
import phoneTopBar from '../assets/Topbarphone.png';
import phoneSettings from '../assets/phoneSettings.png';
import phoneNotification from '../assets/Notification.png';
import {getFakeTime, getFakeDate, getMoonandSunImage} from './timer.js';
import blueCase from '../assets/PhoneCases/1blue.PNG';
import pinkCase from '../assets/PhoneCases/2pink.PNG';
import orangeCase from '../assets/PhoneCases/3orange.PNG';
import greenCase from '../assets/PhoneCases/4green.PNG';
import whiteCase from '../assets/PhoneCases/5white.PNG';
import background1 from '../assets/PhoneBackgrounds/1.PNG';
import background2 from '../assets/PhoneBackgrounds/2.PNG';
import background3 from '../assets/PhoneBackgrounds/3.PNG';
import background4 from '../assets/PhoneBackgrounds/4.PNG';
import background5 from '../assets/PhoneBackgrounds/5.PNG';

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

function phoneCaseIdToImport(phoneCaseId){
    switch (phoneCaseId){
        case 1:
            return blueCase;
        case 2:
            return pinkCase;
        case 3:
            return orangeCase;
        case 4:
            return greenCase;
        case 5:
            return whiteCase;
        default:
            return;
    }
}

function phoneBackgroundIdToImport(phoneBackgroundId){
    console.log(phoneBackgroundId);
    switch (phoneBackgroundId){
        case 1:
            return background1;
        case 2:
            return background2;
        case 3:
            return background3;
        case 4:
            return background4;
        case 5:
            return background5;
        default:
            return;
    }
}

export function PhoneRender({ notifications = [] , phoneCase, phoneBackground}){
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
            <img className = "phoneCase" src={phoneCaseIdToImport(phoneCase)} alt="PhoneCase"></img>
            <img className = "phone" src={phone} alt="Phone"></img>
            <img className = "phoneTopBar" src={phoneTopBar} alt="PhoneTopBar"></img>
            <button className = "phoneSettingsButton" src={phoneSettings} alt="phoneSettings" onClick={() => alert("phoneSettings")}></button>
            <img className = "phoneBackgroundImage" src={phoneBackgroundIdToImport(phoneBackground)} alt="PhoneBackground"></img>
            <div className="phoneBackground">
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