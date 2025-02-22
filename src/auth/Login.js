import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      dispatch(login(email));
      navigate("/dashboard");
    } else {
      alert("User Not Found. please signup");
      navigate("/signup");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg" style={{ width: "400px" }}>
          <h1 className="card-title d-flex justify-content-center my-3">
            Login
          </h1>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="example@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="xxxx"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                &nbsp;
                <div className="d-grid ">
                  <button className="btn btn-info" onClick={handleLogin}>
                    Login
                  </button>
                </div>
                &nbsp;
                <div className="d-flex justify-content-center">
                  <p>
                    Don't have an account - <Link to={"/signup"}>Signup</Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
