import React from "react";

export default function ITable({ data, headers }) {
    return (
        <div className="container mx-auto mb-20 p-4">
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-emerald-700 text-md sm:text-xl text-white">
                            {headers.map((header, index) => (
                                <th key={index} className="py-4 px-4">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`${
                                    rowIndex % 2 === 0 ? "bg-emerald-50" : "bg-white" 
                                }`}
                            >
                                {Object.keys(row).map((key, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="text-sm sm:text-lg px-4 py-5 text-left"
                                    >
                                        {Array.isArray(row[key]) ? (
                                            row[key].map((item, i) => <div key={i}>{item}</div>)
                                        ) : (
                                            <span className={cellIndex === 0 ? "font-bold text-center" : ""}>
                                                {row[key]}
                                            </span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
