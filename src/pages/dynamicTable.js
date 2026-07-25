import React from "react";
import {debuffs} from '../characterStats/characterA.js'

const DynamicDebuffsTable = () => {

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

export default DynamicDebuffsTable;