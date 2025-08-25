/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';

const TextCaptcha = ({ onVerify, onRefresh, showVerifyButton = true }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const canvasRef = useRef(null);

  const generateTextCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    drawTextCaptcha(text);
    setUserInput('');
    setIsVerified(false);
    if (onRefresh) onRefresh();
  };

  const drawTextCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 0.15)`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2,
        2
      );
    }
    
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#b45309';
    
    for (let i = 0; i < text.length; i++) {
      const x = 12 + i * 20;
      const y = 28 + Math.random() * 4;
      const rotation = Math.random() * 0.4 - 0.2;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
    
    ctx.strokeStyle = 'rgba(180, 83, 9, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
  };

  const verifyCaptcha = () => {
    if (userInput.toUpperCase() === captchaText) {
      setIsVerified(true);
      if (onVerify) onVerify(true);
    } else {
      if (onRefresh) onRefresh();
      generateTextCaptcha();
      if (onVerify) onVerify(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      verifyCaptcha();
    }
  };

  useEffect(() => {
    if (userInput.length === 6) {
      if (userInput.toUpperCase() === captchaText) {
        setIsVerified(true);
        if (onVerify) onVerify(true);
      } else {
        setIsVerified(false);
        if (onVerify) onVerify(false);
      }
    } else if (isVerified) {
      setIsVerified(false);
      if (onVerify) onVerify(false);
    }
  }, [userInput, captchaText, onVerify, isVerified]);

  useEffect(() => {
    generateTextCaptcha();
  }, []);

  return (
    <div className="w-full p-3 bg-amber-50 rounded-lg border border-amber-200">
      <div className="mb-2">
        {/* <label className="block text-xs font-medium text-gray-700 mb-1">
          CAPTCHA Verification *
        </label>
        <p className="text-xs text-gray-500 mb-2">Enter the text you see below:</p> */}
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <canvas 
            ref={canvasRef} 
            width="155" 
            height="40"
            className="border border-amber-300 rounded-md bg-white flex-shrink-0"
          ></canvas>
          
          <div className="flex-grow flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              maxLength={6}
              minLength={6}
              className="px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 flex-grow"
              placeholder="Enter 6 characters"
            />
            {showVerifyButton && (
              <button
                onClick={verifyCaptcha}
                className="px-2 py-1 bg-amber-600 text-white rounded-md text-sm hover:bg-amber-700 transition-colors whitespace-nowrap flex-shrink-0"
              >
                Verify
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <button
            onClick={(e) => {
              e.preventDefault(); 
              generateTextCaptcha();
            }}
            className="text-xs text-amber-700 hover:text-amber-900 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            New Captcha
          </button>
          
          {isVerified && (
            <span className="text-xs text-green-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextCaptcha;