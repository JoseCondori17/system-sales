import React from 'react';
import Icon from "./Icon.jsx";

const InputField = ({ type, placeholder, icon, onChange }) => {
    return (
        <div className="mb-2 flex items-center">
            {icon && <Icon name={icon} option={'mr-5 mb-2'} />}
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="p-3 mb-2"
            />
        </div>
    );
};

export default InputField;