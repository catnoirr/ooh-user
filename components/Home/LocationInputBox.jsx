"use client";

import React, { useState, useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MyContext } from "@/context/MyContext";

const LocationInputBox = () => {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBox, setShowBox] = useState(true);
  const { user } = useContext(MyContext); 

  const fetchLocation = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          fetchAddress(latitude, longitude);
        },
        (error) => {
          setLoading(false);
          console.error("Error getting location:", error.message);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLoading(false);
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCYDYbrhpUNYw-GmBeHGOxMQQ6E4lA6Zyk`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setAddress(data.results[0].formatted_address);
        setLoading(false);
        setShowBox(false); // Hide the box when the address is fetched
      } else {
        console.error('Error fetching address:', data.status);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching address:', error.message);
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-2 bg-[#341266] text-white w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-semibold">Hello {user?.name || "User"},</h2>
      </div>
      {showBox ? (
        <div className="relative mt-4 p-4 bg-white text-black rounded-lg">
          <FaTimes
            className="absolute text-[#ccc] top-3 right-3 text-xl cursor-pointer"
            onClick={() => setShowBox(false)}
          />
          <h3 className="text-lg font-semibold mb-2">Change Location</h3>
          <div className="flex items-center space-x-2">
            <button
              className="bg-green-800 text-white text-[10px] sm:px-4 px-2 py-2 rounded-lg"
              onClick={fetchLocation}
              disabled={loading}
            >
              {loading ? 'Detecting...' : 'Detect my location'}
            </button>
            <span className="text-gray-500">OR</span>
            <input
              type="text"
              placeholder="Search delivery location"
              className="border border-gray-300 rounded-lg sm:max-w-[30rem] w-[8rem] px-4 py-1 flex-grow outline-none"
            />
          </div>
        </div>
      ) : (
        address && (
          <div className="mt-4 p-4 bg-white text-black rounded-lg">
            <p className="text-sm text-gray-700">Detected Address:</p>
            <p className="font-semibold">{address}</p>
          </div>
        )
      )}
    </div>
  );
};

export default LocationInputBox;
