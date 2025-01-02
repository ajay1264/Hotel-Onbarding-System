import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';

const MainAdminPanel = () => {
  const [hotels, setHotels] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');

  // Fetch hotels from the server
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setMessage('Failed to fetch hotels');
      }
    };

    fetchHotels();
  }, []);

  // Handle form submission for adding a new hotel
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Log the form data before submitting
    console.log('Form data before submission:', { name, address, selectedFile });

    // Validate required fields
    if (!name || !address || !selectedFile) {
      setMessage('All fields are required.');
      setLoading(false);
      return;
    }

    const newHotel = {
      name,
      address,
      image: selectedFile,
    };

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await axios.post('http://localhost:5000/api/hotels/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Show success message and reset the form
      setMessage('Hotel added successfully');
      setName('');
      setAddress('');
      setSelectedFile(null); 
      setPreview(''); 
      setHotels([...hotels, response.data]); // Add the new hotel to the list
    } catch (error) {
      console.error('Error adding hotel:', error.response || error.message);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      setMessage('Failed to add hotel');
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Update preview
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hotel Management</h1>

      {/* Add Hotel Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Hotel</h2>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Hotel Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col">
            <label className="font-semibold">Add Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded"
            />
            {preview && <img src={preview} alt="Preview" className="w-20 h-20 mt-2" />}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Adding Hotel...' : 'Add Hotel'}
          </button>
        </form>
      </div>

      {/* Table for listing hotels */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Hotel Name</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Logo</th>
            <th className="px-4 py-2 text-left">QR Code</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel._id} className="border-b">
              <td className="px-4 py-2">{hotel.name}</td>
              <td className="px-4 py-2">{hotel.address}</td>
              <td className="px-4 py-2">
                {hotel.image ? (
                   <img src={`http://localhost:5000${hotel.image}`} alt="Logo" className="w-20 h-20" />
                ) : (
                  <p>No logo</p>
                )}
              </td>
              <td className="px-4 py-2">
                <QRCode value={`http://localhost:5173/main-admin/hotel/${hotel._id}`} size={100} />
              </td>
              <td className="px-4 py-2">
                <Link
                  to={`/main-admin/hotel/${hotel._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainAdminPanel;
