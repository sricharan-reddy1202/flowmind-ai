import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const data = await registerUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl w-[400px] space-y-5"
      >
        <h1 className="text-3xl font-bold">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-zinc-800"
        />

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
          Register
        </button>

        <p>
          Already have account?{" "}
          <Link
            to="/"
            className="text-purple-400"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;