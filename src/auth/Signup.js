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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "600px" }}>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <h3 className="text-center mb-4">Signup</h3>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              name="confPass"
              value={confPass}
              onChange={(e) => setConfPass(e.target.value)}
            />
          </div>

          <button className="btn btn-info w-100 mb-3" onClick={handleSubmit}>
            Signup
          </button>

          <div className="text-center">
            <p className="mb-0">
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
