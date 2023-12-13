import React from "react";
import Form from "./Form.jsx";
import {useState} from "react";
const LoginPage = ({ onLoginSuccess }) => {

    const backgroundImage = {
        backgroundImage: 'url("background.jfif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };


    return (
        <div className="flex justify-center items-center h-screen" style={backgroundImage}>
            <Form onLogin={onLoginSuccess}/>
        </div>
    );
}

export default LoginPage;