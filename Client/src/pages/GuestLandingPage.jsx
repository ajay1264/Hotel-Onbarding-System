import React, { useState } from 'react';
import GuestForm from '../components/GuestForm/GuestForm';
import ThankYouPage from '../components/GuestForm/ThankYouPage';

const GuestLandingPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (formData) => {
    console.log('Guest Data:', formData);
    setFormSubmitted(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      {!formSubmitted ? <GuestForm onFormSubmit={handleFormSubmit} /> : <ThankYouPage />}
    </div>
  );
};

export default GuestLandingPage;
