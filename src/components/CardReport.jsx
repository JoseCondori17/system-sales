import React from 'react';

const CardReport = ({setkey, propKey, propValue}) => {
    let text;

    switch (propKey.toUpperCase()) {
        case "REPORTSCOUNTDAY":
            text = "REPORTES DEL DIA";
            break;
        case "TOTALSALESDAY":
            text = "VENTAS DEL DIA";
            break;

        case "REPORTSREGISTEREDCOUNT":
            text = "REPORTES REGISTRADOS";
            break;

        case "TOTALSALESMONTH":
            text = "VENTAS DEL MES";
            break;

        default:
            break;
    }

    return (
        <div
            className="bg-white p-4 rounded-xl w-1/4 m-2 h-25 border border-blue-300 flex flex-col items-center justify-center mb-9"
            key={setkey}
        >
            <div className="text-4xl text-blue-400 font-jua mb-9">{propValue}</div>
            <p className="text-sm font-bold font-jua opacity-50">{text}</p>
        </div>
    );
};

export default CardReport;