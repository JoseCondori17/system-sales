import React from 'react';
import {useState} from "react";
import {invoke} from "@tauri-apps/api";

import InputField from '../InputField.jsx';
import Button from '../Button.jsx';

const Form = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState("employee");

    const handleLogin = (success) => {
        console.log(success)
        if (success === "Succeed"){
            onLogin(rol);
            console.log(rol);
        } else {
            console.log("failed"); // mostrar una advertencia de error login
        }
    };

    const handleButtonClick = (rol) => setRol(rol);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    async function login(){
        try {
            const message = await invoke('login', { username, password, rol }).then((message) => message)
            handleLogin(message);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <InputField type="text"
                        placeholder="Username"
                        icon="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        onChange={handleUsernameChange}/>
            <InputField type="password"
                        placeholder="Password"
                        icon="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        onChange={handlePasswordChange}/>

            <Button onClick={login} className={"mb-4 bg-blue-500 text-white p-2 rounded-md w-[120px] font-jua text-sm"}>Login now</Button>

            <div className="flex justify-between w-full">
                <Button
                    className={`${
                        rol === 'employee' ? 'bg-blue-700' : 'bg-blue-500'
                    } text-white p-2 rounded-md w-[120px] font-jua text-sm`}
                    onClick={() => handleButtonClick("employee")}
                >
                    Employee
                </Button>
                <Button
                    className={`${
                        rol === 'admin' ? 'bg-blue-700' : 'bg-blue-500'
                    } text-white p-2 rounded-md w-[120px] font-jua text-sm`}
                    onClick={() => handleButtonClick("admin")}
                >
                    Administrator
                </Button>
            </div>
        </form>
    );
};

export default Form;