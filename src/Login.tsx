import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    try {
      const response = await fetch("${API_URL}/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      console.log(result);
      if (result.user?.role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setFormData({
        email: "",
        password: "",
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
            height: "50vh",
            padding: "30px",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center">Login</h1>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="At least 10-12 characters"
            />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary w-25">Login</button>
          </div>
          {/* <div>
            <p className="text-center mb-1" style={{ padding: "10px" }}>
              ---OR---- <br />
              Sign in with
            </p>
          </div>

          <button
            className="btn btn-light border d-flex justify-content-center align-items-center mx-auto mb-2"
            style={{ width: "50px", height: "50px", borderRadius: "20%" }}
          >
            <FcGoogle size={50} />
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
