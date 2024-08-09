import { useState } from "react";
import { AgCharts } from "ag-charts-react";

export default function Charts({ charts }) {
    return (
        <div className="absolute bottom-0 z-[5000] m-2">
            <h1>Chart</h1>
            <div className="flex gap-5">
                {charts?.map((chart, index) => (
                    <AgCharts key={index + "_chart"} options={chart} />
                ))}
            </div>
        </div>
    );
}
