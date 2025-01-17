import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signup");
  };
  return (
    <div className="navbar navbar-expand-md bg-info">
      <div className="container-fluid">
        <h2 className="navbar-brand">PharmaciStore</h2>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse mx-auto"
          id="navbarNav"
          style={{ float: "left" }}
        >
          <ul className="navbar-nav mx-end">
            <li className="nav-item">
              {" "}
              <Link to={"/signup"} className="nav-link">
                Aboutus
              </Link>{" "}
            </li>

            <li className="nav-item">
              {" "}
              <Link
                to={"/signup"}
                onClick={() => {
                  handleLogout();
                }}
                className="nav-link"
              >
                Logout
              </Link>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
