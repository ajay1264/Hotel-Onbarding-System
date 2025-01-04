import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    // Fetch hotel details based on the ID
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 font-medium">
        Loading...
      </div>
    );

  if (!hotel)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-medium">
        Hotel not found
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="p-6 bg-white shadow-lg rounded-xl max-w-3xl w-full">
        {/* Header Section: Logo and Name */}
        <div className="flex items-center justify-center mb-8">
          {hotel.image ? (
            <img
              src={`http://localhost:5000${hotel.image}`}
              alt="Hotel Logo"
              className="w-20 h-20 rounded-full shadow-md mr-4"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium mr-4">
              No Logo
            </div>
          )}
          <h1 className="text-4xl font-extrabold text-gray-800">{hotel.name}</h1>
        </div>

        {/* Hotel Details */}
        <div className="text-left">
          {/* Hotel ID */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Hotel ID</h2>
            <p className="text-gray-600">{hotel._id}</p>
          </div>

          {/* Hotel Address */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Address</h2>
            <p className="text-gray-600">{hotel.address}</p>
          </div>
        </div>

        {/* Hotel QR Code */}
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Hotel QR Code</h2>
          <img
            src={hotel.qrCodeURL}
            alt="Hotel QR Code"
            className="w-48 h-48 object-cover border border-gray-300 shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
