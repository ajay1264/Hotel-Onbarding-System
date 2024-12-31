import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);  // For loading state

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

  if (loading) return <div>Loading...</div>;
  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>

      {/* Hotel ID */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Hotel ID</h2>
        <p>{hotel._id}</p>
      </div>

      {/* Hotel Address */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Address</h2>
        <p>{hotel.address}</p>
      </div>

      {/* Hotel Location */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Location</h2>
        <p>{hotel.location}</p>
      </div>

      {/* Hotel QR Code */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Hotel QR Code</h2>
        <img src={hotel.qrCodeURL} alt="Hotel QR Code" className="w-48 h-48 object-cover" />
      </div>

      {/* Add more hotel details as needed */}
    </div>
  );
};

export default HotelPage;
