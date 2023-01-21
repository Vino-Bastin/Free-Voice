import { Route, Routes } from "react-router-dom";

// import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ThemeProvider } from "./theme/Theme";

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Routes>
          <Route index element={<SignUp />} />
          {/* <Route path="/" element={<Main />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
