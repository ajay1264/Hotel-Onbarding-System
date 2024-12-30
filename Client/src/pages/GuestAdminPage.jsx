import React, { useState } from 'react';
import GuestAdminPanel from '../components/AdminPanel/GuestAdminPanel';

const GuestAdminPage = () => {
  const [guests, setGuests] = useState([
    {
      fullName: 'John Doe',
      mobile: '1234567890',
      email: 'john.doe@example.com',
      purpose: 'Business',
    },
    {
      fullName: 'Jane Smith',
      mobile: '9876543210',
      email: 'jane.smith@example.com',
      purpose: 'Tourist',
    },
  ]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-xl font-bold">Guest Admin Dashboard</h1>
      </header>
      <main className="p-6">
        <GuestAdminPanel guests={guests} />
      </main>
    </div>
  );
};

export default GuestAdminPage;
