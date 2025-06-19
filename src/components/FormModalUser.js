import { useState } from 'react';
import {updateUser as updateUserApi} from '../api/user.api.js';
import { useUser } from '../context/user.context';

export default function EditUserModal({closeModal}) {

    const {user, token} = useUser();
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || "");
    const [name, setName] = useState(user?.name || "");
    const [errors, setErrors] = useState({});

    const {updateUser} = useUser();

    const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!address) newErrors.address = "Address is required";

    // if (password && password.length <= 6)
    //   newErrors.password = "Password must be more than 6 characters";

    // if (password && confirmPassword && password !== confirmPassword)
    //   newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        try {
            const response=await updateUserApi(name, phone, address, token);
            console.log("After update, new user: ", response.user);
            updateUser(response.user);
        } catch (err) {
            console.error(err)
            return;
        }
        console.log("Form submitted:");

        setPhone("");
        setName("");
        setAddress("");
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-xl p-8 transition-all duration-300">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
          onClick={closeModal}
        >
          ×
        </button>
        <form onSubmit={handleSubmit}>
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-semibold text-gray-800">Edit Profile</h2>
                <p className="text-sm text-gray-500">Update your personal details</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col mb-2 gap-1">
                <label className="ms-1">Email</label>
                <input
                    type="email"
                    placeholder="Enter Email"
                    className="rounded p-2 border border-gray-300"
                    value={user.email}
                    disabled={true}
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

                {/* <div className="flex flex-col gap-1">
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
                </div> */}

                <div className="flex flex-col gap-1 col-span-2">
                <label className="ms-1">Phone</label>
                <input
                    type="tel"
                    placeholder={"12345678900"}
                    pattern="[0-9]{11}"
                    className="rounded p-2 border border-gray-300"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                </div>

                <div className="flex flex-col gap-1 col-span-2">
                <label className="ms-1">Address</label>
                <input
                    type="text"
                    placeholder="House Number, Street Number, City, Country"
                    className="rounded p-2 border border-gray-300"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                </div>
          </div>
      
          <div className="mt-3">
            <button
              type="submit"
              className="w-full rounded p-2 bg-french_lilac text-white hover:bg-lilac-900 transition mt-4"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
