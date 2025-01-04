import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GuestForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    address: '',
    purpose: '',
    stayFrom: '',
    stayTo: '',
    email: '',
    idProof: '',
    hotelId: '', // Added for selected hotel ID
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hotels, setHotels] = useState([]); // To store the list of hotels
  const [selectedHotel, setSelectedHotel] = useState(null); // To store the selected hotel details
  const navigate = useNavigate(); // Use useNavigate hook

  // Fetch list of hotels from the database on component mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hotels');
        setHotels(response.data); // Set the list of hotels
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  // Handle hotel selection
  const handleHotelChange = (e) => {
    const selectedHotelId = e.target.value;
    setFormData({ ...formData, hotelId: selectedHotelId });

    // Find the selected hotel details
    const hotel = hotels.find((hotel) => hotel._id === selectedHotelId);
    setSelectedHotel(hotel); // Set the selected hotel
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile number validation
    if (name === 'mobile') {
      if (value.length > 10) return; // Restrict input to 10 characters
      if (!/^\d*$/.test(value)) return; // Only allow numeric input
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number length
    if (formData.mobile.length !== 10) {
      alert('Mobile number must be exactly 10 digits.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/guests', formData);
      console.log('Guest registered:', response.data);
      setIsSubmitted(true); // Mark form as submitted

      // Reset form fields
      setFormData({
        fullName: '',
        mobile: '',
        address: '',
        purpose: '',
        stayFrom: '',
        stayTo: '',
        email: '',
        idProof: '',
        hotelId: '', // Reset hotel selection
      });

      // Redirect to Thank You page
      navigate('/thank-you'); // Use navigate for redirection
    } catch (error) {
      console.error('Error registering guest:', error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      {isSubmitted ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Thank You for Registering!</h1>
          <p>Your information has been successfully submitted.</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Guest Information Form</h1>
          {/* Hotel Selection */}
          <div className="mb-6">
            <label htmlFor="hotel" className="block text-lg font-medium mb-2">Select Hotel</label>
            <select
              id="hotel"
              name="hotelId"
              value={formData.hotelId}
              onChange={handleHotelChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Select a hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
              ))}
            </select>
          </div>

          {/* Hotel Name and Address */}
          {selectedHotel && (
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">{selectedHotel.name}</h2>
              <p>{selectedHotel.address}</p>
            </div>
          )}

          {/* Guest Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
              className="w-full p-2 border rounded"
            />
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Purpose of Visit</option>
              <option value="Business">Business</option>
              <option value="Personal">Personal</option>
              <option value="Tourist">Tourist</option>
            </select>
            <div className="flex space-x-4">
              <input
                type="date"
                name="stayFrom"
                value={formData.stayFrom}
                onChange={handleChange}
                required
                className="w-1/2 p-2 border rounded"
                min={new Date().toISOString().split("T")[0]} 
              />
              <input
                type="date"
                name="stayTo"
                value={formData.stayTo}
                onChange={handleChange}
                required
                className="w-1/2 p-2 border rounded"
                min={formData.stayFrom || new Date().toISOString().split("T")[0]}
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="idProof"
              value={formData.idProof}
              onChange={handleChange}
              placeholder="ID Proof Number"
              required
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default GuestForm;
