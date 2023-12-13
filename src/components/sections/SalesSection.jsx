import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";
import Icon from "../Icon.jsx";
import Button from "../Button.jsx";
import Details from "../Details.jsx";
import CardReport from "../CardReport.jsx";
import getReports from "../../store/getReport.js";
const SalesSection = ({rol}) => {
    const [sales, setSales] = useState([])
    const [select, setSelect] = useState(false)
    const [selectedSale, setSelectedSale] = useState(0);
    const [report, setReport] = useState({})

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const event = await invoke('get_all_shopping');
                const fetchedSales = JSON.parse(event);
                setSales(fetchedSales);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData().then();
    }, []);

    useEffect(() => {
        setReport(getReports(sales));
    }, [sales]);

    const formatTime = (datetime) => {
        const timeComponents = datetime.split(',')[1]?.trim().split(':');
        if (timeComponents && timeComponents.length === 3) {
            const hour = parseInt(timeComponents[0]);
            const minute = parseInt(timeComponents[1]);

            if (hour >= 0 && hour <= 11) {
                return `${hour}:${minute} AM`;
            } else {
                return `${hour === 12 ? 12 : hour - 12}:${minute} PM`;
            }
        }
        return '';
    };

    const handleDetails = (index) => {
        setSelectedSale(index);
        setSelect(true);
    };
    const handleOff = () => { setSelect(false); }
    return (
        <div className="flex flex-col h-full p-7">
            <div className="mb-4 h-8 w-full">
                <span className="font-jua text-3xl font-bold">Reportes</span>
            </div>
            {select ? <Details sale={sales[selectedSale]}
                               format={formatTime}
                               onClick={() => handleOff()}
            /> : (
                <div className="flex-1 flex-grow">
                    {rol === 'admin' ? (
                        <div className="flex mx-auto mt-6">
                            {Object.entries(report).map(([key, value], index) => (
                                <CardReport setkey={index} propKey={key} propValue={value}/>
                            ))}
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="flex-1">
                        <div className="flex mb-2 p-2 font-bold text-sm font-jua text-black rounded-xl">
                            <div className="w-1/5 pr-2 text-center">Fecha</div>
                            <div className="w-1/5 pr-2 text-center">Metodo de Pago</div>
                            <div className="w-1/5 pr-2 text-center">Total</div>
                            <div className="w-1/5 pr-2 text-center">Productos</div>
                            <div className="w-1/5 pr-2 text-center">Descuento</div>
                            <div className="w-1/5 pr-2 text-center">Detalles</div>
                        </div>
                        <hr className="border-gray-300 p-0.5"/>
                        <div className="h-96 overflow-y-auto">
                            {sales.map((sale, index) => (
                                <div className="flex mb-2 p-2" key={index}>
                                    <div className="w-1/5 pr-2">
                                        <p className="text-sm text-center font-jua">{sale.datetime.split(',')[0]}</p>
                                        <p className="text-sm text-center font-jua">{formatTime(sale.datetime)}</p>
                                    </div>
                                    <div className="w-1/5 pr-2">
                                        <p className="text-sm text-center font-jua">{sale.payment_method.toUpperCase()}</p>
                                    </div>
                                    <div className="w-1/5 pr-2">
                                        <p className="text-sm text-center font-jua">{sale.amount}</p>
                                    </div>
                                    <div className="w-1/5 pr-2">
                                        <p className="text-sm text-center font-jua">{sale.products.length}</p>
                                    </div>
                                    <div className="w-1/5">
                                        <p className="text-sm text-center font-jua">{sale.discount}</p>
                                    </div>
                                    <div className="w-1/5 text-center">
                                        <Button
                                            onClick={() => handleDetails(index)}
                                            className="text-sm text-blue-500 hover:underline"
                                        >
                                            <Icon
                                                name={"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"}/>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default SalesSection;