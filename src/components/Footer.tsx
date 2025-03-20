'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1A2B4A] text-white p-4 mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              Disclaimer: This is a simulated version of the Nepal Stock Exchange (NEPSE).
              Data shown may not reflect actual market values.
            </p>
          </div>
          
          <div className="text-sm text-gray-300">
            <p>Trading Hours: Sunday to Thursday, 11:00 AM to 3:00 PM NPT</p>
            <p>Last Updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
