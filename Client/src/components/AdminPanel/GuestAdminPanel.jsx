import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';  // Import the axios instance

const GuestAdminPanel = () => {
  const [guests, setGuests] = useState([]);  // State to hold guest data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    // Fetch guest data when the component mounts
    const fetchGuests = async () => {
      try {
        const response = await axiosInstance.get('/api/guests');  // Adjust the endpoint as per your backend
        setGuests(response.data);  // Set the guest data in state
      } catch (err) {
        setError('Error fetching guest data');  // Handle any errors
        console.error(err);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchGuests();
  }, []);  // Empty dependency array to run this only once when the component mounts

  if (loading) return <div>Loading...</div>;  // Show loading state
  if (error) return <div>{error}</div>;  // Show error message if any

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
              <td className="border border-gray-300 p-2">
                <button className="bg-yellow-400 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestAdminPanel;
