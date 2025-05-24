import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
function Signup() {
  // let roles = ["User", "Admin"];
  const navigate = useNavigate();
  // const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      navigate("/admindashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };
  return (
    <div>
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
            height: "70vh",
            padding: "30px",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center">Register</h1>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              required
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
              name="email"
              placeholder="name@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              required
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
              name="password"
              placeholder="At least 10-12 characters"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="At least 10-12 characters"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* <div
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
          </div> */}
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary w-25">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
