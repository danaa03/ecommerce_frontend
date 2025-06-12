import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.apis';
import VerifyEmailAlert from './VerificationAlert';

export default function SignupCard() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [errors, setErrors] = useState({});

    const [showVerifyAlert, setShowVerifyAlert] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!name) newErrors.name = "Name is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (!phone) newErrors.phone = "Phone number is required";

    if (password && password.length <= 6)
      newErrors.password = "Password must be more than 6 characters";

    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        try {
            await signup(email, name,password,confirmPassword,phone);
        } catch (err) {
            console.log("Hello,",err.message)
            if(err?.message.trim()==="Email Already Exists")
            {
                newErrors.email="Email already exists!";
                //we have to set it like this in order to change the object's reference (i.e. the object is replaced by a fresh one) to cause a render
                setErrors(prevErrors => ({
                    ...prevErrors,
                    email: "Email already exists!"
                }));
            }
            return;
        }
        console.log("Form submitted:", { email, name, password, phone });

        setConfirmPassword("");
        setPassword("");
        setPhone("");
        setName("");
        setEmail("");

        setShowVerifyAlert(true);
    }
  };

  return (
    <div className="grid items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-2xl bg-purple-50 border border-purple-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-5 text-center text-2xl font-bold text-purple-800">
            <span>Signup</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col mb-2 gap-1">
              <label className="ms-1">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="rounded p-2 border border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div className="flex flex-col mb-2 gap-1">
              <label className="ms-1">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="rounded p-2 border border-gray-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
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
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="ms-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="rounded p-2 border border-gray-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <label className="ms-1">Phone</label>
              <input
                type="tel"
                placeholder="12345678900"
                pattern="[0-9]{11}"
                className="rounded p-2 border border-gray-300"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="w-full rounded p-2 bg-french_lilac text-white hover:bg-lilac-900 transition mt-4"
            >
              Signup
            </button>
          </div>

          <div className="mb-1 text-center text-purple-800 underline hover:text-lilac-900 mt-2">
            <Link to="/login">
              <span className="text-xs">Already have an account? Log In here</span>
            </Link>
          </div>
        </form>
      </div>
      {showVerifyAlert && (
        <VerifyEmailAlert show={true} onClose={() => setShowVerifyAlert(false)} />
        )}
    </div>
  );
}
