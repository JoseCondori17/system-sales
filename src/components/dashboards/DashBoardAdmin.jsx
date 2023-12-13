import Icon from "../Icon.jsx";
import SellingSection from "../sections/SellingSection.jsx";
import SalesSection from "../sections/SalesSection.jsx";
import ProductsSection from "../sections/ProductsSection.jsx";
import {useState} from "react";

const DashBoardAdmin = ({ onRol }) => {
    const [selectedSection, setSelectedSection] = useState('inventory');
    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    return (
        <div className="flex h-full w-full">
            <div className="w-24 flex-shrink-0 bg-background-steam text-white p-3">
                <div className="my-6 mb-8 text-center font-jua text-[12px] text-background-text border border-background-text p-0.5 rounded-xl">{onRol}</div>
                <div className={`section cursor-pointer flex flex-col items-center mb-2 p-2 rounded-md ${
                        selectedSection === 'inventory' ? 'bg-background-select' : ''
                    }`}
                    onClick={() => handleSectionClick('inventory')}
                >
                    <Icon
                        name={"M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"}/>
                    <span className="font-jua text-sm">Inventario</span>
                </div>
                <div
                    className={`section cursor-pointer flex flex-col items-center mb-2 p-2 rounded-md ${
                        selectedSection === 'report' ? 'bg-background-select' : ''
                    } `}
                    onClick={() => handleSectionClick('report')}
                >
                    <Icon
                        name={"M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"}/>
                    <span className="font-jua text-sm">Reporte</span>
                </div>
            </div>

            <div className="flex-1 mr-3 ml-3">
                {selectedSection === 'inventory' && <ProductsSection rol={onRol}/>}
                {selectedSection === 'report' && <SalesSection rol={onRol}/>}
            </div>
        </div>
    );
}

export default DashBoardAdmin;