import React from 'react';

export default function Congratulations() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 to-rose-500 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl transform rotate-1 border-4 border-rose-100">
        <h1 className="text-3xl md:text-5xl font-bold text-rose-600 text-center leading-tight">
          congratulation you made it
        </h1>
      </div>
    </div>
  );
}