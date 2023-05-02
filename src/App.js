import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Component/LoginPage/LoginPage";
import CreatePage from "./Component/CraeteNewAccount/CreatePage";
import HomePage from "./Component/HomePage/HomePage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/CreatePage"
          element={
            <>
              <CreatePage />
            </>
          }
        />
        <Route
          path="/LoginPage"
          element={
            <>
              <LoginPage />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
