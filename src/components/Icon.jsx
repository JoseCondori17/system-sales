import React from 'react';

const Icon = ({ name, option}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className={`w-6 h-6 ${option}`}>
            <path strokeLinecap="round"
                  strokeLinejoin="round"
                  d={name}/>
        </svg>
    );
};
export default Icon;