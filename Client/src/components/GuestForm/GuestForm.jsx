import React, { useState } from 'react';

const GuestForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    address: '',
    purpose: '',
    stayFrom: '',
    stayTo: '',
    email: '',
    idProof: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
    setFormData({
      fullName: '',
      mobile: '',
      address: '',
      purpose: '',
      stayFrom: '',
      stayTo: '',
      email: '',
      idProof: '',
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Guest Information Form</h1>
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
          <option value="" disabled>
            Purpose of Visit
          </option>
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
          />
          <input
            type="date"
            name="stayTo"
            value={formData.stayTo}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
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
    </div>
  );
};

export default GuestForm;
