import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth.apis';

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "Username is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    setLoginError(""); 

    if (Object.keys(newErrors).length === 0) {
      try {
        await login(email, password);
        setEmail("");
        setPassword("");
        navigate('/');
        return;
      } catch (err) {
        setLoginError("Invalid username or password");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-2xl bg-purple-50 border border-purple-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="mb-4 text-center text-2xl font-bold text-purple-800">
            <span>Login</span>
          </div>

          <div className="flex flex-col mb-2 gap-1">
            <label className="ms-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="rounded p-2 border border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="ms-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="rounded p-2 border border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="w-full rounded p-2 bg-french_lilac text-white hover:bg-lilac-900 transition"
            >
              Login
            </button>

            {loginError && (
              <div className="text-center text-red-500 text-sm mb-2">
                {loginError}
              </div>
            )}
          </div>

          <div className="mb-1 text-center text-purple-800 underline hover:text-lilac-900">
            <Link to="/signup">
              <span className="text-xs">Don't have an account? Sign Up Here</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
