import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ThemeProvider } from "./theme/Theme";
import { AuthProvider } from "./firebase/AuthProvider";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <div className="app">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
