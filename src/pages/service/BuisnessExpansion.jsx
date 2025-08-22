import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/event-card";
import { cn } from "@/lib/utils";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  Tag,
  Briefcase,
  Map,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import BASE_URL from "@/config/BaseUrl";
import useNumericInput from "@/hooks/useNumericInput";
import TextCaptcha from "@/components/customCaptcha/TextCaptcha";

const BusinessExpansion = () => {
  const [activeTab, setActiveTab] = useState("products");
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [showCaptchaError, setShowCaptchaError] = useState(false);
    const [captchaErrorType, setCaptchaErrorType] = useState('');
  const [productsForm, setProductsForm] = useState({
    full_name: "",
    mobile_no: "",
    email: "",
    address: "",
    product_type: "",
    about_you: "",
    which_state: "",
    which_area: "",
    investment_amount: "",
    what_you_offer: "",
  });

  const [distributorForm, setDistributorForm] = useState({
    full_name1: "",
    mobile_no1: "",
    email1: "",
    address1: "",
    product_type1: "",
    brand_name1: "",
    about_you1: "",
    looking_for1: "",
    which_state1: "",
    which_area1: "",
    investment_amount1: "",
    what_you_offer1: "",
  });
  const keyDown = useNumericInput();
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const aboutYouOptions = ["Agent", "Distributor", "Manufacturer", "Retailer"];
  const lookingForOptions = ["Agent", "Distributor", "Retailer"];

  const validateProducts = useCallback(() => {
    const newErrors = {};
    if (!productsForm.full_name.trim()) {
      newErrors.full_name = "Full Name is required";
    }
    if (!productsForm.mobile_no.trim()) {
      newErrors.mobile_no = "Mobile No is required";
    }
    if (!productsForm.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!productsForm.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!productsForm.product_type.trim()) {
      newErrors.product_type = "Product is required";
    }
    if (!productsForm.about_you.trim()) {
      newErrors.about_you = "About You is required";
    }
    if (!productsForm.which_state.trim()) {
      newErrors.which_state = "State is required";
    }
    if (!productsForm.which_area.trim()) {
      newErrors.which_area = "Area/Region is required";
    }
    if (!productsForm.investment_amount.trim()) {
      newErrors.investment_amount = "Price Category is required";
    }
    if (!productsForm.what_you_offer.trim()) {
      newErrors.what_you_offer = "What you Offer is required";
    }

    return newErrors;
  }, [productsForm]);

  const validateDistributor = useCallback(() => {
    const newErrors = {};
    if (!distributorForm.full_name1.trim()) {
      newErrors.full_name1 = "Full Name is required";
    }
    if (!distributorForm.mobile_no1.trim()) {
      newErrors.mobile_no1 = "Mobile No is required";
    }
    if (!distributorForm.email1.trim()) {
      newErrors.email1 = "Email is required";
    }
    if (!distributorForm.address1.trim()) {
      newErrors.address1 = "Address is required";
    }
    if (!distributorForm.product_type1.trim()) {
      newErrors.product_type1 = "Product is required";
    }
    if (!distributorForm.brand_name1.trim()) {
      newErrors.brand_name1 = "Brand is required";
    }
    if (!distributorForm.about_you1.trim()) {
      newErrors.about_you1 = "About You is required";
    }
    if (!distributorForm.looking_for1.trim()) {
      newErrors.looking_for1 = "Looking For is required";
    }
    if (!distributorForm.which_state1.trim()) {
      newErrors.which_state1 = "State is required";
    }
    if (!distributorForm.which_area1.trim()) {
      newErrors.which_area1 = "Area/Region is required";
    }
    if (!distributorForm.investment_amount1.trim()) {
      newErrors.investment_amount1 = "Price Category is required";
    }
    if (!distributorForm.what_you_offer1.trim()) {
      newErrors.what_you_offer1 = "What you Offer is required";
    }

    return newErrors;
  }, [distributorForm]);

  const handleProductsChange = (e) => {
    const { name, value } = e.target;
    setProductsForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleDistributorChange = (e) => {
    const { name, value } = e.target;
    setDistributorForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const productsMutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(
         `${BASE_URL}/api/create-business-product`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    },
    onSuccess: (response) => {
      console.log("Products form submitted successfully", response);

      const res = response.data;

      if (res.code === "201") {
        setProductsForm({
          full_name: "",
          mobile_no: "",
          email: "",
          address: "",
          product_type: "",
          about_you: "",
          which_state: "",
          which_area: "",
          investment_amount: "",
          what_you_offer: "",
        });
        setCaptchaVerified(false);
        setShowCaptcha(false);
        toast.success(
          res.msg || "Looking Products request sent successfully! ✅"
        );
      } else if (res.code === "400") {
        toast.error(res.msg || "Something went wrong ❌");
      } else {
        toast.error(res.msg || "Unknown error occurred ❌");
      }
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Error submitting form");
      setLoader(false);
    },
  });

  const distributorMutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(
         `${BASE_URL}/api/create-business`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    },
    onSuccess: (response) => {
      console.log("Distributor form submitted successfully", response);

      const res = response.data;

      if (res.code === "201") {
        setDistributorForm({
          full_name1: "",
          mobile_no1: "",
          email1: "",
          address1: "",
          product_type1: "",
          brand_name1: "",
          about_you1: "",
          looking_for1: "",
          which_state1: "",
          which_area1: "",
          investment_amount1: "",
          what_you_offer1: "",
        });
        setCaptchaVerified(false);
        setShowCaptcha(false);
        toast.success(res.msg || "Distributor request sent successfully! ✅");
      } else if (res.code === "400") {
        toast.error(res.msg || "Something went wrong ❌");
      } else {
        toast.error(res.msg || "Unknown error occurred ❌");
      }
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Error submitting form");
      setLoader(false);
    },
  });
  const handleNext = (e) => {
    e.preventDefault();
  
    let validationErrors = {};
    if (activeTab === "products") {
      validationErrors = validateProducts();
    } else {
      validationErrors = validateDistributor();
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setShowCaptcha(true);
  };
  
  const handleProductsSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProducts();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (showCaptcha && !captchaVerified) {
      setShowCaptchaError(true);
      setCaptchaErrorType('incomplete')
      return;
    }
    setLoader(true);
    const payload = new FormData();
    payload.append("full_name", productsForm.full_name);
    payload.append("mobile_no", productsForm.mobile_no);
    payload.append("email", productsForm.email);
    payload.append("address", productsForm.address);
    payload.append("product_type", productsForm.product_type);
    payload.append("about_you", productsForm.about_you);
    payload.append("which_state", productsForm.which_state);
    payload.append("which_area", productsForm.which_area);
    payload.append("investment_amount", productsForm.investment_amount);
    payload.append("what_you_offer", productsForm.what_you_offer);
    try {
      await productsMutation.mutateAsync(payload);
    } catch (error) {
      console.error("Error submitting product form:", error);
    } finally {
      setLoader(false);
    }
  

  };

  const handleDistributorSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateDistributor();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (showCaptcha && !captchaVerified) {
      setShowCaptchaError(true);
      setCaptchaErrorType('incomplete')
      return;
    }
    setLoader(true);
    const payload = new FormData();
    payload.append("full_name1", distributorForm.full_name1);
    payload.append("mobile_no1", distributorForm.mobile_no1);
    payload.append("email1", distributorForm.email1);
    payload.append("address1", distributorForm.address1);
    payload.append("product_type1", distributorForm.product_type1);
    payload.append("brand_name1", distributorForm.brand_name1);
    payload.append("about_you1", distributorForm.about_you1);
    payload.append("looking_for1", distributorForm.looking_for1);
    payload.append("which_state1", distributorForm.which_state1);
    payload.append("which_area1", distributorForm.which_area1);
    payload.append("investment_amount1", distributorForm.investment_amount1);
    payload.append("what_you_offer1", distributorForm.what_you_offer1);
    try {
      await distributorMutation.mutateAsync(payload);
    } catch (error) {
      console.error("Error submitting distributor form:", error);
    } finally {
      setLoader(false);
    }
   
   
  };

  const CardHeading = useCallback(
    ({ icon: Icon, title, description }) => (
      <div className="px-2">
        <span className="text-muted-foreground flex items-center gap-2">
          <Icon className="size-4" />
          {title}
        </span>
        <p className="mt-2 sm:mt-4 text-xl sm:text-2xl font-semibold">
          {description}
        </p>
      </div>
    ),
    []
  );

  const FeatureCard = useCallback(
    ({ children, className }) => (
      <Card
        className={cn(
          "group relative rounded-none shadow-zinc-950/5",
          className
        )}
      >
        <CardDecorator />
        {children}
      </Card>
    ),
    []
  );

  const CardDecorator = useCallback(
    () => (
      <>
        <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
        <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
        <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
        <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
      </>
    ),
    []
  );

  return (
    <div className="relative w-full py-4 sm:py-8 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[85rem] mx-auto ">
        {/* Hero Section */}
        <div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          // initial={{ opacity: 0, y: 20 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.5 }}
          // viewport={{ once: true }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            SIGA <Highlight>Business Expansion</Highlight>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            SIGA Members are given opportunity to find buyer or sellers. Please
            fill the below form and let TEAM SIGA work for you
          </p>
        </div>

        {/* Tabs and Form Section */}
        <FeatureCard>
          <CardHeader className="pb-2 sm:pb-4">
            <CardHeading
              icon={Briefcase}
              title="Business Expansion"
              description="Connect with potential partners"
            />
          </CardHeader>
          <CardContent>
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-0 w-full">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`flex-1 whitespace-nowrap py-3 px-4 text-center font-medium text-sm transition-all duration-200 ${
                    activeTab === "products"
                      ? "border-b-2 border-yellow-500 text-yellow-900 bg-yellow-50 shadow-sm"
                      : "border-b border-gray-200 text-gray-900 hover:text-gray-700 bg-gray-50"
                  }`}
                >
                  Looking Products
                </button>
                <button
                  onClick={() => setActiveTab("distributors")}
                  className={`flex-1 whitespace-nowrap py-3 px-4 text-center font-medium text-sm transition-all duration-200 ${
                    activeTab === "distributors"
                      ? "border-b-2 border-yellow-500 text-yellow-900 bg-yellow-50 shadow-sm"
                      : "border-b border-gray-200 text-gray-900 hover:text-gray-700 bg-gray-50"
                  }`}
                >
                  Looking Distributor/Agent/Retailer
                </button>
              </nav>
            </div>

            {/* Looking Products Form */}
            {activeTab === "products" && (
              <form
                onSubmit={handleProductsSubmit}
                className="space-y-4 sm:space-y-4 p-2 sm:p-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={productsForm.full_name}
                      onChange={handleProductsChange}
                      placeholder="Enter your full name"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.full_name
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.full_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  {/* Contact No */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact No *
                    </label>
                    <input
                      type="tel"
                      name="mobile_no"
                      onKeyDown={keyDown}
                      minLength={10}
                      maxLength={10}
                      value={productsForm.mobile_no}
                      onChange={handleProductsChange}
                      placeholder="9876543210"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.mobile_no
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.mobile_no && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.mobile_no}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Id *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={productsForm.email}
                      onChange={handleProductsChange}
                      placeholder="abc@gmail.com"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.email
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={productsForm.address}
                    onChange={handleProductsChange}
                    rows={3}
                    placeholder="Enter your complete address"
                    className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                            ${
                                              errors.address
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-yellow-500 focus:ring-yellow-500"
                                            }
                                            text-sm border p-2`}
                    
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Product */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product *
                  </label>
                  <input
                    type="text"
                    name="product_type"
                    value={productsForm.product_type}
                    onChange={handleProductsChange}
                    placeholder="Enter product name"
                    className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                            ${
                                              errors.product_type
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-yellow-500 focus:ring-yellow-500"
                                            }
                                            text-sm py-2 border`}
                    
                  />
                  {errors.product_type && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.product_type}
                    </p>
                  )}
                </div>

                {/* About You */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    About You *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                    {aboutYouOptions.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          id={`products-about-${option}`}
                          name="about_you"
                          type="radio"
                          value={option}
                          checked={productsForm.about_you === option}
                          onChange={handleProductsChange}
                          className={`focus:ring-1 h-3 w-3 sm:h-4 sm:w-4 
                                                        ${
                                                          errors.about_you
                                                            ? "text-red-600 focus:ring-red-500"
                                                            : "text-yellow-600 focus:ring-yellow-500"
                                                        } 
                                                        border-gray-300`}
                          
                        />
                        <label
                          htmlFor={`products-about-${option}`}
                          className="ml-2 sm:ml-3 block text-sm text-gray-700"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.about_you && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.about_you}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="which_state"
                      value={productsForm.which_state}
                      onChange={handleProductsChange}
                      placeholder="Enter state"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.which_state
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.which_state && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.which_state}
                      </p>
                    )}
                  </div>

                  {/* Area/Region */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area/Region *
                    </label>
                    <input
                      type="text"
                      name="which_area"
                      value={productsForm.which_area}
                      onChange={handleProductsChange}
                      placeholder="Enter area/region"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.which_area
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.which_area && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.which_area}
                      </p>
                    )}
                  </div>

                  {/* Price Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Investment Amount *
                    </label>
                    <input
                      type="text"
                      name="investment_amount"
                      value={productsForm.investment_amount}
                      onChange={handleProductsChange}
                      placeholder="Enter investment amount"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.investment_amount
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.investment_amount && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.investment_amount}
                      </p>
                    )}
                  </div>
                </div>

                {/* What your Offer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What your Offer *
                  </label>
                  <textarea
                    name="what_you_offer"
                    value={productsForm.what_you_offer}
                    onChange={handleProductsChange}
                    rows={3}
                    placeholder="Describe what you offer"
                    className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                            ${
                                              errors.what_you_offer
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-yellow-500 focus:ring-yellow-500"
                                            }
                                            text-sm border p-2`}
                    
                  />
                  {errors.what_you_offer && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.what_you_offer}
                    </p>
                  )}
                </div>



                {!showCaptcha && (
        <motion.button
          onClick={handleNext}
          className="w-full  flex justify-center py-1.5 sm:py-2.5 px-3.5 sm:px-5.5 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Next
        </motion.button>
      )}
          
               
                {showCaptcha && (
  <div className="pt-2  sm:pt-2 border-t border-gray-200">
    <TextCaptcha 
      onVerify={(isVerified) => {
        setCaptchaVerified(isVerified);
        if (!isVerified) {
          setShowCaptchaError(true);
          setCaptchaErrorType('failed');
        } else {
          setShowCaptchaError(false);
          setCaptchaErrorType('');
        }
      }}
      onRefresh={() => {
        setCaptchaVerified(false);
        setShowCaptchaError(false);
        setCaptchaErrorType('');
      }}
      showVerifyButton={false} 
    />
    {showCaptchaError && (
      <p className="text-red-500 text-xs mt-2">
        {captchaErrorType === 'failed' 
          ? "CAPTCHA verification failed. Please try again."
          : "Please complete the CAPTCHA verification"
        }
      </p>
    )}
  </div>
)}
                
                {/* Submit Button */}
                {showCaptcha && (
                  <div className="  ">
                    <motion.button
                      type="submit"
                      disabled={loader}
                     
                      className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loader
                      ? "Submitting..."
                      : "Submit Looking Products Request"}
                    </motion.button>
                  </div>
                )}

                {/* Submit Button */}
                {/* <div className="pt-2 sm:pt-4">
                  <motion.button
                    type="submit"
                    className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loader}
                  >
                    {loader
                      ? "Submitting..."
                      : "Submit Looking Products Request"}
                  </motion.button>
                </div> */}
              </form>
            )}

            {/* Looking Distributor/Agent/Retailer Form */}
            {activeTab === "distributors" && (
              <form
                onSubmit={handleDistributorSubmit}
                className="space-y-4 sm:space-y-4 p-2 sm:p-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name1"
                      value={distributorForm.full_name1}
                      onChange={handleDistributorChange}
                      placeholder="Enter your full name"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.full_name1
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.full_name1 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.full_name1}
                      </p>
                    )}
                  </div>

                  {/* Contact No */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact No *
                    </label>
                    <input
                      type="tel"
                      name="mobile_no1"
                      onKeyDown={keyDown}
                      minLength={10}
                      maxLength={10}
                      value={distributorForm.mobile_no1}
                      onChange={handleDistributorChange}
                      placeholder="9876543210"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.mobile_no1
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.mobile_no1 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.mobile_no1}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Id *
                    </label>
                    <input
                      type="email"
                      name="email1"
                      value={distributorForm.email1}
                      onChange={handleDistributorChange}
                      placeholder="abc@gmail.com"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.email1
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.email1 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email1}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    name="address1"
                    value={distributorForm.address1}
                    onChange={handleDistributorChange}
                    rows={3}
                    placeholder="Enter your complete address"
                    className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                            ${
                                              errors.address1
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-yellow-500 focus:ring-yellow-500"
                                            }
                                            text-sm border p-2`}
                    
                  />
                  {errors.address1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address1}
                    </p>
                  )}
                </div>

                {/* Product */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product *
                  </label>
                  <input
                    type="text"
                    name="product_type1"
                    value={distributorForm.product_type1}
                    onChange={handleDistributorChange}
                    placeholder="Enter product name"
                    className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                            ${
                                              errors.product_type1
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-yellow-500 focus:ring-yellow-500"
                                            }
                                            text-sm py-2 border`}
                    
                  />
                  {errors.product_type1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.product_type1}
                    </p>
                  )}
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand_name1"
                    value={distributorForm.brand_name1}
                    onChange={handleDistributorChange}
                    placeholder="Enter brand name"
                    className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                            ${
                                              errors.brand_name1
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-yellow-500 focus:ring-yellow-500"
                                            }
                                            text-sm py-2 border`}
                    
                  />
                  {errors.brand_name1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.brand_name1}
                    </p>
                  )}
                </div>

                {/* About You */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    About You *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                    {aboutYouOptions.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          id={`distributor-about-${option}`}
                          name="about_you1"
                          type="radio"
                          value={option}
                          checked={distributorForm.about_you1 === option}
                          onChange={handleDistributorChange}
                          className={`focus:ring-1 h-3 w-3 sm:h-4 sm:w-4 
                                                        ${
                                                          errors.about_you1
                                                            ? "text-red-600 focus:ring-red-500"
                                                            : "text-yellow-600 focus:ring-yellow-500"
                                                        } 
                                                        border-gray-300`}
                          
                        />
                        <label
                          htmlFor={`distributor-about-${option}`}
                          className="ml-2 sm:ml-3 block text-sm text-gray-700"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.about_you1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.about_you1}
                    </p>
                  )}
                </div>

                {/* Looking For */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Looking For *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                    {lookingForOptions.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          id={`looking-for-${option}`}
                          name="looking_for1"
                          type="radio"
                          value={option}
                          checked={distributorForm.looking_for1 === option}
                          onChange={handleDistributorChange}
                          className={`focus:ring-1 h-3 w-3 sm:h-4 sm:w-4 
                                                        ${
                                                          errors.looking_for1
                                                            ? "text-red-600 focus:ring-red-500"
                                                            : "text-yellow-600 focus:ring-yellow-500"
                                                        } 
                                                        border-gray-300`}
                          
                        />
                        <label
                          htmlFor={`looking-for-${option}`}
                          className="ml-2 sm:ml-3 block text-sm text-gray-700"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.looking_for1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.looking_for1}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="which_state1"
                      value={distributorForm.which_state1}
                      onChange={handleDistributorChange}
                      placeholder="Enter state"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.which_state1
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.which_state1 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.which_state1}
                      </p>
                    )}
                  </div>

                  {/* Area/Region */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area/Region *
                    </label>
                    <input
                      type="text"
                      name="which_area1"
                      value={distributorForm.which_area1}
                      onChange={handleDistributorChange}
                      placeholder="Enter area/region"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.which_area1
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.which_area1 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.which_area1}
                      </p>
                    )}
                  </div>

                  {/* Price Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Investment Amount *
                    </label>
                    <input
                      type="text"
                      name="investment_amount1"
                      value={distributorForm.investment_amount1}
                      onChange={handleDistributorChange}
                      placeholder="Enter investment amount"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                                ${
                                                  errors.investment_amount1
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "focus:border-yellow-500 focus:ring-yellow-500"
                                                }
                                                text-sm py-2 border`}
                      
                    />
                    {errors.investment_amount1 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.investment_amount1}
                      </p>
                    )}
                  </div>
                </div>

                {/* What your Offer */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What your Offer *
                  </label>
                  <textarea
                    name="what_you_offer1"
                    value={distributorForm.what_you_offer1}
                    onChange={handleDistributorChange}
                    rows={3}
                    placeholder="Describe what you offer"
                    className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                                            ${
                                              errors.what_you_offer1
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-yellow-500 focus:ring-yellow-500"
                                            }
                                            text-sm border p-2`}
                    
                  />
                  {errors.what_you_offer1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.what_you_offer1}
                    </p>
                  )}
                </div>

 {!showCaptcha && (
        <motion.button
          onClick={handleNext}
          className="w-full  flex justify-center py-1.5 sm:py-2.5 px-3.5 sm:px-5.5 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Next
        </motion.button>
      )}
          
               
                {showCaptcha && (
  <div className="pt-2  sm:pt-2 border-t border-gray-200">
    <TextCaptcha 
      onVerify={(isVerified) => {
        setCaptchaVerified(isVerified);
        if (!isVerified) {
          setShowCaptchaError(true);
          setCaptchaErrorType('failed');
        } else {
          setShowCaptchaError(false);
          setCaptchaErrorType('');
        }
      }}
      onRefresh={() => {
        setCaptchaVerified(false);
        setShowCaptchaError(false);
        setCaptchaErrorType('');
      }}
      showVerifyButton={false} 
    />
    {showCaptchaError && (
      <p className="text-red-500 text-xs mt-2">
        {captchaErrorType === 'failed' 
          ? "CAPTCHA verification failed. Please try again."
          : "Please complete the CAPTCHA verification"
        }
      </p>
    )}
  </div>
)}
                
                {/* Submit Button */}
                {showCaptcha && (
                  <div className="  ">
                    <motion.button
                      type="submit"
                      disabled={loader}
                     
                      className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loader
                      ? "Submitting..."
                      : "Submit Looking Distributor Request"}
                    </motion.button>
                  </div>
                )}


                {/* Submit Button */}
                {/* <div className="pt-2 sm:pt-4">
                  <motion.button
                    type="submit"
                    className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loader}
                  >
                    {loader
                      ? "Submitting..."
                      : "Submit Looking Distributor Request"}
                  </motion.button>
                </div> */}
              </form>
            )}
          </CardContent>
        </FeatureCard>
      </div>
    </div>
  );
};

export default BusinessExpansion;

const Highlight = ({ children, className }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300/70 -rotate-1 -z-0"></span>
    </span>
  );
};
