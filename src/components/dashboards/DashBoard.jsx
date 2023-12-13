import React from "react";
import {useState} from "react";
import Icon from "../Icon.jsx";
import SellingSection from "../sections/SellingSection.jsx";
import SalesSection from "../sections/SalesSection.jsx";

const DashBoard = ({onRol}) => {
    const [selectedSection, setSelectedSection] = useState('selling');
    const [onRolDefined, setOnRolDefined] = useState('');
    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    return (
        <div className="flex h-full w-full">
            <div className="w-24 bg-background-steam text-white p-3">
                <div className="my-6 mb-8 text-center font-jua text-[12px] text-background-text border border-background-text p-0.5 rounded-xl">{onRol}</div>
                <div
                    className={`section cursor-pointer flex flex-col items-center mb-2 p-2 rounded-md ${
                        selectedSection === 'selling' ? 'bg-background-select' : ''
                    }`}
                    onClick={() => handleSectionClick('selling')}
                >
                    <Icon
                        name={"M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"}/>
                    <span className="font-jua text-sm">Vender</span>
                </div>
                <div
                    className={`section cursor-pointer flex flex-col items-center mb-2 p-2 rounded-md ${
                        selectedSection === 'sales' ? 'bg-background-select' : ''
                    } `}
                    onClick={() => handleSectionClick('sales')}
                >
                    <Icon
                        name={"M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"}/>
                    <span className="font-jua text-sm">Reportes</span>
                </div>
            </div>

            <div className="flex-1 mr-3 ml-3">
                {selectedSection === 'selling' && <SellingSection rol={onRol}/>}
                {selectedSection === 'sales' && <SalesSection />}
            </div>
        </div>
    );
}

export default DashBoard