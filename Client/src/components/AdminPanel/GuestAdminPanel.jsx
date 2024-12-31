import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance"; // Import the axios instance

const GuestAdminPanel = () => {
  const [guests, setGuests] = useState([]); // State to hold guest data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedGuest, setSelectedGuest] = useState(null); // Selected guest for view modal
  const [editMode, setEditMode] = useState(false); // Edit mode state

  useEffect(() => {
    // Fetch guest data when the component mounts
    const fetchGuests = async () => {
      try {
        const response = await axiosInstance.get("/api/guests"); // Adjust the endpoint as per your backend
        setGuests(response.data); // Set the guest data in state
      } catch (err) {
        setError("Error fetching guest data"); // Handle any errors
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchGuests();
  }, []); // Empty dependency array to run this only once when the component mounts

  const handleEdit = (guest) => {
    setSelectedGuest(guest); // Set the selected guest for editing
    setEditMode(true); // Enable edit mode
  };

  const handleView = (guest) => {
    setSelectedGuest(guest); // Set the selected guest for viewing
    setEditMode(false); // Disable edit mode if it was enabled
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/api/guests/${selectedGuest._id}`, selectedGuest);
      alert("Guest details updated successfully!");
      // Refresh the guest list
      const response = await axiosInstance.get("/api/guests");
      setGuests(response.data);
      setSelectedGuest(null);
    } catch (err) {
      console.error("Error updating guest:", err);
      alert("Failed to update guest details.");
    }
  };

  const handlePrint = () => {
    window.print(); // Trigger browser's print functionality
  };

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error message if any

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Guest Admin Panel</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Full Name</th>
            <th className="border border-gray-300 p-2">Mobile Number</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Purpose of Visit</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{guest.fullName}</td>
              <td className="border border-gray-300 p-2">{guest.mobile}</td>
              <td className="border border-gray-300 p-2">{guest.email}</td>
              <td className="border border-gray-300 p-2">{guest.purpose}</td>
              <td className="border border-gray-300 p-2">{guest.address || "N/A"}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(guest)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleView(guest)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for View or Edit */}
      {selectedGuest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Guest Details" : "Guest Details"}
            </h2>
            <div>
              <label className="block mb-2">
                Full Name:
                <input
                  type="text"
                  value={selectedGuest.fullName}
                  disabled={!editMode}
                  onChange={(e) =>
                    setSelectedGuest({ ...selectedGuest, fullName: e.target.value })
                  }
                  className="block w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                Mobile Number:
                <input
                  type="text"
                  value={selectedGuest.mobile}
                  disabled={!editMode}
                  onChange={(e) =>
                    setSelectedGuest({ ...selectedGuest, mobile: e.target.value })
                  }
                  className="block w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  value={selectedGuest.email}
                  disabled={!editMode}
                  onChange={(e) =>
                    setSelectedGuest({ ...selectedGuest, email: e.target.value })
                  }
                  className="block w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                Purpose of Visit:
                <input
                  type="text"
                  value={selectedGuest.purpose}
                  disabled={!editMode}
                  onChange={(e) =>
                    setSelectedGuest({ ...selectedGuest, purpose: e.target.value })
                  }
                  className="block w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-4">
                Address:
                <input
                  type="text"
                  value={selectedGuest.address || ""}
                  disabled={!editMode}
                  onChange={(e) =>
                    setSelectedGuest({ ...selectedGuest, address: e.target.value })
                  }
                  className="block w-full p-2 border rounded"
                />
              </label>
              {!editMode && (
                <button
                  onClick={handlePrint}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Print
                </button>
              )}
              {editMode && (
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
              )}
              <button
                onClick={() => setSelectedGuest(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestAdminPanel;
