import { useUser } from '../context/user.context';
import Header from '../components/Header.js';
import FormModalUser from '../components/FormModalUser.js';
import { useState } from 'react';

function UserProfile() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  function toggleModal(){
    setShowModal(!showModal);
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4 sm:p-10 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-6">User Profile</h2>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Info</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 break-words">
            <p className="break-words"><strong>Name:</strong> {user?.name}</p>
            <p className="break-all"><strong>Email:</strong> {user?.email}</p>
            <p className="break-words"><strong>Contact:</strong> {user?.phone}</p>
            <p className="break-words"><strong>Address:</strong> {user?.address}</p>
          </div>

          <button
            className="mt-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
            onClick={toggleModal}
          >
            Edit
          </button>
        </div>
      </div>

      {showModal && <FormModalUser closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default UserProfile;
