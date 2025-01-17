import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !email || !password || !confPass) {
      setError("All fields are required!");
      return;
    }

    if (password !== confPass) {
      setError("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.email === email)) {
      alert("Email is already in use!");
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup Successfull!");
    navigate("/login");
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "400px" }}>
          <div className="card-body">
            <div className="row">
              <div className="col">
                {error && (
                  <div className="alert alert-danger">
                    <p>{error}</p>
                  </div>
                )}
                <div className="form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                &nbsp;
                <br></br>
                <div className="form-group">
                  <label>Confirm password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="confPass"
                    value={confPass}
                    onChange={(e) => setConfPass(e.target.value)}
                  />
                </div>
                &nbsp;
                <div className="d-grid">
                  <button
                    className="btn btn-info btn-block"
                    onClick={handleSubmit}
                  >
                    Signup
                  </button>
                </div>
                <br></br>
                <div className="d-flex justify-content-center">
                  <p>
                    Already have an account - <Link to={"/login"}>Login</Link>{" "}
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

export default Signup;
