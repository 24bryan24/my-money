import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { isPopUpOpen, authIsReady, user: loggedIn, cursor } = useAuthContext();

  document.body.style.cursor = cursor;

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {authIsReady && (
          <Switch>
            <Route exact path="/">
              {!loggedIn ? <Redirect to="/login" /> : <Home />}
            </Route>
            <Route path="/login">
              {loggedIn ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/signup">
              {loggedIn ? <Redirect to="/" /> : <SignUp />}
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
