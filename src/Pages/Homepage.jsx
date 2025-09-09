import { Link } from "react-router-dom";
import NavPage from "../Components/NavPage";
import AppNav from "../Components/AppNav";

function Homepage() {
  return (
    <div>
      <NavPage />
      <AppNav />
      <h1>WorldWise</h1>
      <Link to="/app">App</Link>
    </div>
  );
}

export default Homepage;
