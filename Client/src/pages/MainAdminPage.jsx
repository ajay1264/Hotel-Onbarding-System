import React from 'react';
import MainAdminPanel from '../components/AdminPanel/MainAdminPanel';

const MainAdminPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-xl font-bold">Main Admin Dashboard</h1>
      </header>
      <main className="p-6">
        <MainAdminPanel />
      </main>
    </div>
  );
};

export default MainAdminPage;
