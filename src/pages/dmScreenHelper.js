import { useEffect, useState} from "react";
import './pages.css';

export default function DmScreenHeader() {
    return(
        <div>
            <div className="DmScreenHeader">
                <button className="HeaderButton" onClick={() => window.location = '/dmScreenTimeManager'}>TIME MANAGER</button>
                <button className="HeaderButton" onClick={() => window.location = '/dmScreenPlayerManager'}>PLAYER MANAGER</button>
                <button className="HeaderButton" onClick={() => window.location = '/dmScreenShopManager'}>SHOP MANAGER</button>
                <button className="HeaderButton" onClick={() => window.location = '/dmScreenCombatManager'}>COMBAT MANAGER</button>
            </div>
        </div>
    );
}