// src/components/Profile.jsx
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
type User = {
  name: string;
  email: string;
};
const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      const email = userData.email || "";

      const nameFromEmail = email.split("@")[0];

      setUser({
        name: nameFromEmail || "Guest",
        email: email,
      });
    }
  }, []);

  const handleEditProfile = () => {
    alert("Profile edit feature coming soon!");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-5 p-4 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My Profile</h2>
        <button
          onClick={handleEditProfile}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaPlus />
        </button>
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <span className="font-medium text-gray-600">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-medium text-gray-600">Email:</span> {user.email}
        </div>
      </div>
    </div>
  );
};

export default Profile;
