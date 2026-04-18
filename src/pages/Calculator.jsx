import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Calculator() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldReset, setShouldReset] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleNumber = (num) => {
    if (display === '0' || shouldReset) {
      setDisplay(num);
      setShouldReset(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op) => {
    setEquation(display + ' ' + op + ' ');
    setShouldReset(true);
  };

  const calculate = () => {
    try {
      const expr = (equation + display).trim();
      const safeExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-eval
      const result = eval(safeExpr);
      setDisplay(String(result));
      setEquation('');
      setShouldReset(true);

      if (Number(result) === 10) {
        setShowPopup(true);
      }
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const CalcButton = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`h-14 rounded-2xl text-xl font-bold transition-all active:scale-95 shadow-sm ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-pink-500 p-6">
      {/* Custom Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          />
          {/* Modal */}
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center text-center animate-bounce-once">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-pink-600 mb-2">You did it!</h2>
            <p className="text-gray-500 mb-6">The answer is 10! Amazing job! 🥳</p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg"
            >
              Awesome! 🎊
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-3xl shadow-2xl transform rotate-1 border-4 border-pink-100 mb-8 max-w-sm w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-600 text-center leading-tight mb-6">
          Calculator
        </h1>

        {/* Calculator Display */}
        <div className="bg-slate-100 p-4 rounded-2xl mb-4 text-right overflow-hidden border border-slate-200">
          <div className="text-slate-400 text-xs h-4 mb-1">{equation}</div>
          <div className="text-slate-800 text-3xl font-mono truncate">{display}</div>
        </div>

        {/* Calculator Keys */}
        <div className="grid grid-cols-4 gap-2">
          <CalcButton onClick={clear} className="bg-pink-100 text-pink-600 col-span-2">AC</CalcButton>
          <CalcButton onClick={() => handleOperator('/')} className="bg-pink-500 text-white">÷</CalcButton>
          <CalcButton onClick={() => handleOperator('*')} className="bg-pink-500 text-white">×</CalcButton>

          {[7, 8, 9].map(n => (
            <CalcButton key={n} onClick={() => handleNumber(String(n))} className="bg-slate-100 text-slate-700">{n}</CalcButton>
          ))}
          <CalcButton onClick={() => handleOperator('-')} className="bg-pink-500 text-white">-</CalcButton>

          {[4, 5, 6].map(n => (
            <CalcButton key={n} onClick={() => handleNumber(String(n))} className="bg-slate-100 text-slate-700">{n}</CalcButton>
          ))}
          <CalcButton onClick={() => handleOperator('+')} className="bg-pink-500 text-white">+</CalcButton>

          {[1, 2, 3].map(n => (
            <CalcButton key={n} onClick={() => handleNumber(String(n))} className="bg-slate-100 text-slate-700">{n}</CalcButton>
          ))}
          <CalcButton onClick={calculate} className="bg-pink-600 text-white row-span-2">=</CalcButton>

          <CalcButton onClick={() => handleNumber('0')} className="bg-slate-100 text-slate-700 col-span-2">0</CalcButton>
          <CalcButton onClick={() => handleNumber('.')} className="bg-slate-100 text-slate-700">.</CalcButton>
        </div>
      </div>

      {/* Back to Main Page button */}
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full border border-white/50 transition-all backdrop-blur-sm active:scale-95"
      >
        ← Back to Main Page
      </button>
    </div>
  );
}