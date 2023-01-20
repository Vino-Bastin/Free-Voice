import { Route, Router } from "react-router-dom";

import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={<Main />} />
        <Route path="/signup" exact component={<SignUp />} />
        <Route path="/login" exact component={<Login />} />
      </Router>
    </>
  );
}

export default App;
