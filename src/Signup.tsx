import { useState } from "react";

function Signup() {
  let roles = ["User", "Admin"];
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('./public/smartapp.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        className="w-25 border border-secondary p-4 rounded shadow"
        style={{
          height: "80vh",
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
        }}
      >
        <h1 className="text-center">Signup</h1>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Name
          </label>
          <input
            type="username"
            className="form-control"
            id="username"
            placeholder="Your name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@gmail.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="At least 10-12 characters"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="At least 10-12 characters"
          />
        </div>
        <div
          className="mb-3 d-flex align-items-center"
          style={{ padding: "20px" }}
        >
          <label htmlFor="role" className="form-label  me-3 mb-0">
            Role
          </label>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="form-select w-75"
          >
            <option value="">-- Select --</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary w-25">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
