import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import axiosInstance from "../../utils/axiosInstance";

const HotelQRCode = ({ hotelId }) => {
  if (!hotelId) return "N/A";
  const qrValue = `http://localhost:5173/main-admin/hotel/${hotelId}`;
  return (
    <div className="flex justify-center items-center">
      <QRCode value={qrValue} size={100} className="border border-gray-300 p-2" />
    </div>
  );
};

const GuestAdminPanel = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axiosInstance.get("/api/guests");
        setGuests(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching guest data");
        console.error(err);
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const handleEdit = (guest) => {
    setSelectedGuest(guest);
    setEditMode(true);
  };

  const handleView = (guest) => {
    setSelectedGuest(guest);
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/api/guests/${selectedGuest._id}`, selectedGuest);
      alert("Guest details updated successfully!");

      const response = await axiosInstance.get("/api/guests");
      setGuests(response.data);
      setSelectedGuest(null);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating guest:", err);
      alert("Failed to update guest details.");
    }
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Guest Details</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              .print-container {
                border: 2px solid #000;
                padding: 20px;
                margin: 20px;
                max-width: 600px;
                margin: auto;
              }
              .hidden-print {
                display: none;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
              }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Guest Admin Panel</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Full Name</th>
            <th className="border border-gray-300 p-2">Mobile Number</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Purpose of Visit</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Hotel Name</th>
            <th className="border border-gray-300 p-2">Hotel Address</th>
            <th className="border border-gray-300 p-2">QR Code</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest._id} className="text-center">
              <td className="border border-gray-300 p-2">{guest.fullName}</td>
              <td className="border border-gray-300 p-2">{guest.mobile}</td>
              <td className="border border-gray-300 p-2">{guest.email}</td>
              <td className="border border-gray-300 p-2">{guest.purpose}</td>
              <td className="border border-gray-300 p-2">{guest.address || "N/A"}</td>
              <td className="border border-gray-300 p-2">
                {guest.hotel ? guest.hotel.name : "N/A"}
              </td>
              <td className="border border-gray-300 p-2">
                {guest.hotel ? guest.hotel.address : "N/A"}
              </td>
              <td className="border border-gray-300 p-2">
                <HotelQRCode hotelId={guest.hotel?._id} />
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(guest)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleView(guest)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedGuest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2 print-container" ref={printRef}>
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Guest Details" : "Guest Details"}
            </h2>
            {editMode ? (
              <>
                <label className="block">Full Name:</label>
                <input
                  value={selectedGuest.fullName || ""}
                  onChange={(e) =>
                    setSelectedGuest({ ...selectedGuest, fullName: e.target.value })
                  }
                  className="border p-2 w-full mb-2"
                />

                <label className="block">Mobile:</label>
                <input
                  value={selectedGuest.mobile || ""}
                  onChange={(e) =>
                    setSelectedGuest({ ...selectedGuest, mobile: e.target.value })
                  }
                  className="border p-2 w-full mb-2"
                />

                <label className="block">Email:</label>
                <input
                  value={selectedGuest.email || ""}
                  onChange={(e) =>
                    setSelectedGuest({ ...selectedGuest, email: e.target.value })
                  }
                  className="border p-2 w-full mb-2"
                />

                <label className="block">Purpose:</label>
                <input
                  value={selectedGuest.purpose || ""}
                  onChange={(e) =>
                    setSelectedGuest({ ...selectedGuest, purpose: e.target.value })
                  }
                  className="border p-2 w-full mb-2"
                />

                <label className="block">Address:</label>
                <input
                  value={selectedGuest.address || ""}
                  onChange={(e) =>
                    setSelectedGuest({ ...selectedGuest, address: e.target.value })
                  }
                  className="border p-2 w-full mb-2"
                />
                {/* Add more input fields for other editable properties */}
                
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p><strong>Full Name:</strong> {selectedGuest.fullName}</p>
                <p><strong>Mobile:</strong> {selectedGuest.mobile}</p>
                <p><strong>Email:</strong> {selectedGuest.email}</p>
                <p><strong>Purpose:</strong> {selectedGuest.purpose}</p>
                <p><strong>Address:</strong> {selectedGuest.address}</p>
                <p><strong>Hotel Name:</strong> {selectedGuest.hotel?.name || "N/A"}</p>
                <p><strong>Hotel Address:</strong> {selectedGuest.hotel?.address || "N/A"}</p>
                <HotelQRCode hotelId={selectedGuest.hotel?._id} />
                <button
                  onClick={handlePrint}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Print Details
                </button>
              </>
            )}

            <button
              onClick={() => setSelectedGuest(null)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestAdminPanel;
