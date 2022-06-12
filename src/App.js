import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Details from "./components/Details";
// import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Originals from "./components/Originals";
import WatchList from "./components/WatchList";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/detail/:id">
            <Details />
          </Route>
          <Route path="/watchlist">
            <WatchList />
          </Route>
          <Route path="/originals">
            <Originals />
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
