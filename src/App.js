import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { SetPage } from "./pages/sets-page/set-page";
import { UserContext } from "./context";
import { initialUserState } from "./context";
import { HomePage } from "./pages/home-page/home-page";
import "./App.css";

const App = () => {
  const [userData, setUserData] = useState(() => initialUserState());

  useEffect(() => {
    sessionStorage.setItem("User Stats", JSON.stringify(userData));
  }, [userData]);

  return (
    <div className="App">
      <main className="App-container">
        <UserContext.Provider value={{ userData, setUserData }}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sets" element={<SetPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </HashRouter>
        </UserContext.Provider>
      </main>
    </div>
  );
};

export default App;
