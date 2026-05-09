import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl w-[400px] space-y-5"
      >
        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-zinc-800"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-zinc-800"
        />

        <button
          className="w-full bg-purple-600 p-3 rounded-lg"
        >
          Login
        </button>

        <p>
          No account?{" "}
          <Link
            to="/register"
            className="text-purple-400"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;