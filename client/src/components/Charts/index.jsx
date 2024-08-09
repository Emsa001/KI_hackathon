import { AgCharts } from "ag-charts-react";

export default function Charts({ charts }) {
    return (
        <div className="absolute bottom-0 z-[5000] m-2">
            <div className="flex gap-5">
                {charts?.map((chart, index) => (
                    <div key={index + "_chart"} className="bg-gray-900 text-white text-center">
                        <h1>{chart.name}</h1>
                        <AgCharts options={chart} />
                    </div>
                ))}
            </div>
        </div>
    );
}
