import React from "react";

const DynamicDebuffsTable = () => {
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

export default DynamicDebuffsTable;