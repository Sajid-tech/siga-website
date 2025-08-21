import React, { useState, useEffect } from 'react';
import { X, Mail, Bell, Sparkles } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import BASE_URL from '@/config/BaseUrl';

const Newsletter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [placeholder, setPlaceholder] = useState('Enter your email');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
  
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };
  
  const validateEmail = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    return newErrors;
  };

  const handleSubscribe = async () => {
    const validationErrors = validateEmail();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Set the placeholder to show the error
      setPlaceholder(validationErrors.email);
      
      // Add red border and shake animation to indicate error
      const input = document.querySelector('input[name="news_email"]');
      input.classList.add('border-red-500', 'animate-shake');
      
      // Remove the error indication after 3 seconds
      setTimeout(() => {
        setErrors({});
        setPlaceholder('Enter your email');
        input.classList.remove('border-red-500', 'animate-shake');
      }, 3000);
      
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post(
          `${BASE_URL}/api/create-news-entry`,
        { news_email: email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const res = response.data;

      if (res.code === "201") {
        setEmail('');
        setErrors({});
        setPlaceholder('Enter your email');
        toast.success(res.msg || "Subscribed successfully! ✅");
        handleClose();
      } else if (res.code === "400") {
        toast.error(res.heading || "Something went wrong ❌");
      } else {
        toast.error(res.msg || "Unknown error occurred ❌");
      }
    } catch (error) {
      console.error("Error submitting newsletter form:", error);
      toast.error(error.response?.data?.message || "Subscription failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Reset placeholder when user starts typing
    if (errors.email) {
      setErrors({});
      setPlaceholder('Enter your email');
      const input = document.querySelector('input[name="news_email"]');
      input.classList.remove('border-red-500', 'animate-shake');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-5 right-5 z-50 transition-all duration-500 transform ${
        isClosing 
          ? 'translate-y-full opacity-0 rotate-12 scale-75' 
          : 'translate-y-0 opacity-100 rotate-0 scale-100'
      }`}
    >
      <div className="absolute -inset-4 bg-yellow-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
      
      <div className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-80 transform transition-all duration-700 ${
        isClosing ? '' : ''
      }`}>
        
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 hover:rotate-90 transform"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-50 animate-ping"></div>
            <div className="relative bg-red-500 p-3 rounded-full">
              <Mail className="text-white animate-pulse" size={24} />
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-yellow-500 animate-spin" size={16} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Newsletter
            </h3>
            <Sparkles className="text-yellow-500 animate-spin" size={16} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Stay connected with our latest News & Updates
          </p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <input
              type="email"
              name="news_email"
              value={email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 hover:shadow-lg ${
                errors.email
                  ? "border-red-500 placeholder-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 hover:border-yellow-400"
              }`}
            />
            <Bell className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-1.5 rounded-md font-semibold transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:border-red-400 border-2 border-transparent transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Subscribing..." : "Subscribe Now"}
          </button>
        </div>

        <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 -left-1 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-500"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-yellow-400 rounded-full animate-float-${i % 3}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default Newsletter;