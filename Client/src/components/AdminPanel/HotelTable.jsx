import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const HotelTable = ({ hotels }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Registered Hotels</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Hotel Name</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Logo</th>
            <th className="border border-gray-300 p-2">QR Code</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{hotel.name}</td>
              <td className="border border-gray-300 p-2">{hotel.address}</td>
              <td className="border border-gray-300 p-2">
                {hotel.logo && (
                  <img
                    src={URL.createObjectURL(hotel.logo)}
                    alt="Hotel Logo"
                    className="h-12 mx-auto"
                  />
                )}
              </td>
              <td className="border border-gray-300 p-2">
                <QRCodeCanvas value={`https://example.com/hotel/${hotel.id}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelTable;
