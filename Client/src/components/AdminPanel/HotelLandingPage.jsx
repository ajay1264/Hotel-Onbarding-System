import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HotelLandingPage = () => {
  const { id } = useParams(); // Get hotel ID from URL
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    fetchHotel();
  }, [id]);

  return (
    <div className="hotel-landing-page">
      {hotel ? (
        <div>
          <h1>{hotel.name}</h1>
          <p>{hotel.address}</p>
          <img src={hotel.logo} alt="Hotel Logo" />
          {/* Other hotel details */}
        </div>
      ) : (
        <p>Loading hotel details...</p>
      )}
    </div>
  );
};

export default HotelLandingPage;
