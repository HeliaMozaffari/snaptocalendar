import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Congratulations() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 to-rose-500 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl transform rotate-1 border-4 border-rose-100 mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-rose-600 text-center leading-tight">
          congratulation you made it
        </h1>
      </div>
      
      <button 
        onClick={() => navigate(-1)}
        className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full border border-white/50 transition-all backdrop-blur-sm active:scale-95"
      >
        ← go back
      </button>
    </div>
  );
}