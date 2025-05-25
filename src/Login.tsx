// function Login() {
//   return (
//     <>
//       <div className="mb-3 w-25 mx-auto">
//         <label htmlFor="exampleFormControlInput1" className="form-label ">
//           Email address
//         </label>
//         <input
//           type="email"
//           className="form-control"
//           id="exampleFormControlInput1"
//           placeholder="name@example.com"
//         />
//       </div>
//       <div className="mb-3 w-25 mx-auto">
//         <label htmlFor="exampleFormControlInput1" className="form-label">
//           Password
//         </label>
//         <input
//           type="email"
//           className="form-control"
//           id="exampleFormControlInput1"
//           placeholder="Password should be atleast 10-12 characters"
//         />
//       </div>
//     </>
//   );
// }

// export default Login;
import { FcGoogle } from "react-icons/fc";
function Login() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('./public/smartapp.jpeg')", // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        className="w-25 border border-secondary p-4 rounded shadow"
        style={{
          height: "55vh",
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
        }}
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
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary w-25">Login</button>
        </div>
        <div>
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
        </button>
      </form>
    </div>
  );
}

export default Login;
