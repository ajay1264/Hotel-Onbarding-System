import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    // Fetch hotel details based on the ID
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel:', error);
      }
    };

    fetchHotel();
  }, [id]);

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="hotel-details">
      <h1>{hotel.name}</h1>
      <p>{hotel.address}</p>
      <img src={hotel.qrCodeURL} alt="Hotel QR Code" />
      {/* Add more hotel details as needed */}
    </div>
  );
};

export default HotelPage;
