import React from 'react';

const Button = ({ onClick, className, children }) => {
    return (
        <button type="button"
                onClick={onClick}
                className={className}>
            {children}
        </button>
    );
};

export default Button;
