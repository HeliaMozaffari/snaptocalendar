import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Congratulations() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

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
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
      setShouldReset(true);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const Button = ({ children, onClick, className = '' }) => (
    <button 
      onClick={onClick} 
      className={`h-14 rounded-2xl text-xl font-bold transition-all active:scale-95 shadow-sm ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 to-rose-500 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl transform rotate-1 border-4 border-rose-100 mb-8 max-w-sm w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-rose-600 text-center leading-tight mb-6">
          congratulation you made it
        </h1>

        {/* Calculator Display */}
        <div className="bg-slate-100 p-4 rounded-2xl mb-4 text-right overflow-hidden border border-slate-200">
          <div className="text-slate-400 text-xs h-4 mb-1">{equation}</div>
          <div className="text-slate-800 text-3xl font-mono truncate">{display}</div>
        </div>

        {/* Calculator Keys */}
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={clear} className="bg-rose-100 text-rose-600 col-span-2">AC</Button>
          <Button onClick={() => handleOperator('/')} className="bg-rose-500 text-white">÷</Button>
          <Button onClick={() => handleOperator('*')} className="bg-rose-500 text-white">×</Button>
          
          {[7, 8, 9].map(n => (
            <Button key={n} onClick={() => handleNumber(String(n))} className="bg-slate-100 text-slate-700">{n}</Button>
          ))}
          <Button onClick={() => handleOperator('-')} className="bg-rose-500 text-white">-</Button>
          
          {[4, 5, 6].map(n => (
            <Button key={n} onClick={() => handleNumber(String(n))} className="bg-slate-100 text-slate-700">{n}</Button>
          ))}
          <Button onClick={() => handleOperator('+')} className="bg-rose-500 text-white">+</Button>
          
          {[1, 2, 3].map(n => (
            <Button key={n} onClick={() => handleNumber(String(n))} className="bg-slate-100 text-slate-700">{n}</Button>
          ))}
          <Button onClick={calculate} className="bg-rose-600 text-white row-span-2">=</Button>
          
          <Button onClick={() => handleNumber('0')} className="bg-slate-100 text-slate-700 col-span-2">0</Button>
          <Button onClick={() => handleNumber('.')} className="bg-slate-100 text-slate-700">.</Button>
        </div>
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
