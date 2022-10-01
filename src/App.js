import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { SetPage } from "./pages/sets-page/set-page";
import { UserContext } from "./context";

import "./App.css";
import { initialUserState } from "./context";

const App = () => {
  const [setsData, setSetsData] = useState(() => initialUserState());

  useEffect(() => {
    sessionStorage.setItem("User Score", JSON.stringify(setsData));
  }, [setsData]);

  return (
    <div className="App">
      <div className="App-container">
        <UserContext.Provider value={{ setsData, setSetsData }}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<SetPage setsData={setsData} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </HashRouter>
        </UserContext.Provider>
      </div>
    </div>
  );
};

export default App;
