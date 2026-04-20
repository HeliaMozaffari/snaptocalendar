import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-300 to-orange-400 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl transform -rotate-1 border-4 border-yellow-100 mb-8 max-w-sm w-full text-center">
        <div className="text-7xl mb-4">🎊</div>
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-600 leading-tight mb-4"
          style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}>
          Yaay you did it!
        </h1>
        <p className="text-gray-500 text-base">
          You clicked the button! Amazing! 🥳✨
        </p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full border border-white/50 transition-all backdrop-blur-sm active:scale-95"
      >
        ← Go back
      </button>
    </div>
  );
}
