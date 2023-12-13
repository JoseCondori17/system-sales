import LoginPage from "./components/login/LoginPage.jsx";
import {useState} from "react";
import DashBoardAdmin from "./components/dashboards/DashBoardAdmin.jsx";
import DashBoard from "./components/dashboards/DashBoard.jsx";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [rol, setRol] = useState("employee");
  const handleLoginSuccess = (rol) => {
      setRol(rol);
      setLoggedIn(true);
  };

  return (
      <div className="h-screen w-screen">
        { isLoggedIn && rol === "employee" ? (
            <DashBoard onRol={"employee"}/>
        ) : (
            isLoggedIn && rol === "admin" ? (
                <DashBoardAdmin onRol={"admin"}/>
            ) : (<LoginPage onLoginSuccess={handleLoginSuccess}/>)
        )}
      </div>
  );
}

export default App;
