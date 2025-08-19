import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Star, Users, Check } from "lucide-react";
import { Label } from "@/components/ui/label";

const PatternSVG = ({ category }) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id={`pattern-${category}`}
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="20" cy="20" r="2" fill="currentColor"></circle>
      </pattern>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#pattern-${category})`}
      ></rect>
    </svg>
  );
};

const MemberShip = () => {
  const [membershipCategory, setMembershipCategory] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [logo, setLogo] = useState(null);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "photo") {
        setPhoto(imageUrl);
      } else if (type === "logo") {
        setLogo(imageUrl);
      }
    }
  };

  const membershipData = {
    "life-patron": {
      title: "Life Patron Member",
      price: "₹20,000",
      priceNote: "+ GST",
      description:
        "Lifetime subscription with premium benefits and exclusive access",
      color: "from-purple-50 to-purple-100/50",
      borderColor: "border-purple-200",
      textColor: "text-purple-900",
      accentColor: "bg-purple-500",
      hoverColor: "hover:border-purple-300",
      bgGradient: "bg-gradient-to-br from-purple-50 to-white",
      icon: <Star className="w-5 h-5" />,
      features: ["Lifetime Access"],
    },
    ordinary: {
        title: "Ordinary\u00A0 Member",

      price: "₹2,000",
      priceNote: "/year",
      description: "Annual membership with comprehensive standard benefits",
      color: "from-blue-50 to-blue-100/50",
      borderColor: "border-blue-200",
      textColor: "text-blue-900",
      accentColor: "bg-blue-500",
      hoverColor: "hover:border-blue-300",
      bgGradient: "bg-gradient-to-br from-blue-50 to-white",
      icon: <Shield className="w-5 h-5" />,
      features: ["Annual Renewal"],
    },
    associate: {
      title: "Associate Member",
      price: "₹2,000",
      priceNote: "/year + GST",
      description: "Annual membership designed for associates and partners",
      color: "from-emerald-50 to-emerald-100/50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-900",
      accentColor: "bg-emerald-500",
      hoverColor: "hover:border-emerald-300",
      bgGradient: "bg-gradient-to-br from-emerald-50 to-white",
      icon: <Users className="w-5 h-5" />,
      features: ["Annual Renewal"],
    },
  };

  const businessTypeColors = {
    manufacturer: "bg-indigo-100 text-indigo-800",
    distributor: "bg-blue-100 text-blue-800",
    agent: "bg-emerald-100 text-emerald-800",
    consultant: "bg-amber-100 text-amber-800",
    wholesaler: "bg-purple-100 text-purple-800",
  };

  const handleCategorySelect = (value) => {
    setMembershipCategory(value);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setMembershipCategory("");
  };

  return (
    <div className="relative w-full pt-28 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SIGA <Highlight>Membership</Highlight>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the membership category that best fits your needs
          </p>
        </motion.div>

      

        <div className={` bg-white z-50 flex flex-col `}>
          <div className="absolute bottom-0 left-0 w-full h-[60%] overflow-hidden  rounded-t-[10%] opacity-80">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/90 to-indigo-50/20"></div>

            {/* Glow blobs */}
            <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-indigo-300/25 blur-[100px]"></div>
            <div className="absolute bottom-[-150px] left-10 w-[500px] h-[500px] rounded-full bg-red-300/25 blur-[100px]"></div>

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>

            {/* Radial pattern */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)",
                backgroundSize: "60px 60px",
                animation: "moveBackground 20s infinite alternate",
              }}
            ></div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 sm:max-w-4xl mx-auto relative">
              {/* Background pattern */}
              <div className="absolute inset-0 overflow-hidden opacity-5 -z-10">
                <svg
                  className="absolute inset-0 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <pattern
                    id="pattern-circles"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="20" cy="20" r="1" fill="currentColor"></circle>
                  </pattern>
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#pattern-circles)"
                  ></rect>
                </svg>
              </div>

              {step === 1 ? (
                <>
                 

                  <RadioGroup
                    value={membershipCategory}
                    onValueChange={handleCategorySelect}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4"
                  >
                    {Object.entries(membershipData).map(([key, data]) => (
                      <div
                        key={key}
                        onClick={() => handleCategorySelect(key)}
                        className={`relative group cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          membershipCategory === key ? "scale-[1.02]" : ""
                        }`}
                      >
                        <div
                          className={`relative p-6 border-2 rounded-2xl transition-all duration-300 h-full ${
                            membershipCategory === key
                              ? `${data.borderColor} ${data.bgGradient} shadow-lg`
                              : `border-gray-200 bg-white ${data.hoverColor} hover:shadow-md`
                          }`}
                        >
                          {/* Pattern Background */}
                          {membershipCategory === key && (
                            <div
                              className={`absolute inset-0 ${data.textColor}`}
                            >
                              <PatternSVG category={key} />
                            </div>
                          )}

                          <div className="relative flex flex-col h-full">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`p-3 rounded-xl ${
                                    membershipCategory === key
                                      ? `${data.accentColor} text-white shadow-lg`
                                      : "bg-gray-100 text-gray-600"
                                  } transition-all duration-300`}
                                >
                                  {data.icon}
                                </div>
                                <div>
                                  <Label
                                    htmlFor={key}
                                    className="text-lg font-semibold cursor-pointer"
                                  >
                                    {data.title}
                                  </Label>
                                  <div className="flex items-baseline gap-1 mt-1">
                                    <span
                                      className={`text-2xl font-bold ${
                                        membershipCategory === key
                                          ? data.textColor
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {data.price}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {data.priceNote}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {membershipCategory === key && (
                                <div
                                  className={`p-2 rounded-full ${data.accentColor} text-white`}
                                >
                                  <Check className="w-4 h-4" />
                                </div>
                              )}
                            </div>

                            <p className="text-gray-600 text-sm mb-4 flex-grow">
                              {data.description}
                            </p>

                            <div className="flex flex-row items-center justify-between gap-2">
                              {data.features.map((feature, index) => (
                                <span
                                  key={index}
                                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
                                    membershipCategory === key
                                      ? `${data.accentColor} text-white shadow-sm`
                                      : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {feature}
                                </span>
                              ))}

                              <span
                                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${data.accentColor} text-white shadow-sm `}
                              >
                                Select
                              </span>
                            </div>

                            <RadioGroupItem
                              value={key}
                              id={key}
                              className="absolute opacity-0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                  <div className="text-center mb-8 mt-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Become a part of SIGA
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Join our community of garment industry professionals
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <p className="text-sm text-gray-900 mb-3">
                        Any firm or individual involved in the Garment trade &
                        industry as a manufacturer, distributor or agent or
                        involved as a consultant or promoter is eligible to
                        become a member of SIGA subject to approval of the
                        managing committee.
                      </p>
                      <p className="text-sm text-gray-900">
                        Membership will be considered only with an application
                        form along with the payment to the marked membership
                        category.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* <div className="flex items-start justify-between mb-8">
                        <div>
                          <h2 className="text-3xl font-semibold mb-3 text-gray-900">Fill Your Details</h2>
                          <button 
                          onClick={handleBack}
                          className="text-sm font-medium  p-1 text-gray-800 cursor-pointer hover:scale-125 hover:text-gray-900 flex items-center transition-colors"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Change
                        </button>
                        </div>
                       
                     
                          <div
      className={`inline-flex items-center px-2.5 py-1 rounded-md border 
        ${membershipData[membershipCategory]?.borderColor} 
        ${membershipData[membershipCategory]?.textColor}
        ${membershipData[membershipCategory]?.color}
        bg-opacity-40 backdrop-blur-sm shadow-sm ring-1 ring-white/30`}
      style={{
        boxShadow: `0 0 12px -2px var(--tw-shadow-color)`,
        "--tw-shadow-color": membershipCategory === "life-patron"
          ? "rgba(168, 85, 247, 0.5)" 
          : membershipCategory === "ordinary"
          ? "rgba(59, 130, 246, 0.5)" 
          : "rgba(16, 185, 129, 0.5)", 
      }}
    >
      <div className={`flex items-center justify-center p-1 rounded-md 
        ${membershipData[membershipCategory]?.accentColor} text-white shadow-md`}>
        {membershipData[membershipCategory]?.icon}
      </div>
    
      <span className="ml-2 text-sm font-medium">
        {membershipData[membershipCategory]?.title}
      </span>
    
      <span className="ml-2 text-xs font-normal opacity-80">
        • {membershipData[membershipCategory]?.price}
      </span>
    </div>
    
                      </div> */}

                  <div className="mb-8">
                    {/* Row 1 */}
                    <div className="hidden sm:flex items-center justify-between">
                      {/* Large screen heading */}
                      <h2 className="text-3xl font-semibold text-gray-900">
                        Fill Your Details
                      </h2>

                      {/* Badge (large screen) */}
                      <div
                        className={`inline-flex items-center px-2.5 py-1 rounded-md border 
            ${membershipData[membershipCategory]?.borderColor} 
            ${membershipData[membershipCategory]?.textColor}
            ${membershipData[membershipCategory]?.color}
            bg-opacity-40 backdrop-blur-sm shadow-sm ring-1 ring-white/30
            flex-shrink-0`}
                        style={{
                          boxShadow: `0 0 12px -2px var(--tw-shadow-color)`,
                          "--tw-shadow-color":
                            membershipCategory === "life-patron"
                              ? "rgba(168, 85, 247, 0.5)"
                              : membershipCategory === "ordinary"
                              ? "rgba(59, 130, 246, 0.5)"
                              : "rgba(16, 185, 129, 0.5)",
                        }}
                      >
                        <div
                          className={`flex items-center justify-center p-1 rounded-md 
              ${membershipData[membershipCategory]?.accentColor} text-white shadow-md`}
                        >
                          {membershipData[membershipCategory]?.icon}
                        </div>

                        <span className="ml-2 text-sm font-medium">
                          {membershipData[membershipCategory]?.title}
                        </span>

                        <span className="ml-2 text-xs font-normal opacity-80">
                          • {membershipData[membershipCategory]?.price}
                        </span>
                      </div>
                    </div>

                    {/* Row 1 - Small screen centered heading */}
                    <div className="flex sm:hidden justify-center mb-3">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Fill Your Details
                      </h2>
                    </div>

                    {/* Row 2 */}
                    <div className="flex items-center justify-between mt-2">
                      {/* Change button */}
                      <button
                        onClick={handleBack}
                        className="text-sm font-medium p-1 text-gray-800 cursor-pointer 
            hover:scale-110 hover:text-gray-900 flex items-center transition-all"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        Change
                      </button>

                      {/* Badge (small screen) */}
                      <div className="sm:hidden">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-md border 
              ${membershipData[membershipCategory]?.borderColor} 
              ${membershipData[membershipCategory]?.textColor}
              ${membershipData[membershipCategory]?.color}
              bg-opacity-40 backdrop-blur-sm shadow-sm ring-1 ring-white/30`}
                          style={{
                            boxShadow: `0 0 12px -2px var(--tw-shadow-color)`,
                            "--tw-shadow-color":
                              membershipCategory === "life-patron"
                                ? "rgba(168, 85, 247, 0.5)"
                                : membershipCategory === "ordinary"
                                ? "rgba(59, 130, 246, 0.5)"
                                : "rgba(16, 185, 129, 0.5)",
                          }}
                        >
                          <div
                            className={`flex items-center justify-center p-1 rounded-md 
                ${membershipData[membershipCategory]?.accentColor} text-white shadow-md`}
                          >
                            {membershipData[membershipCategory]?.icon}
                          </div>

                          <span className="ml-2 text-sm font-medium">
                            {membershipData[membershipCategory]?.title}
                          </span>

                          <span className="ml-2 text-xs font-normal opacity-80">
                            • {membershipData[membershipCategory]?.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-900">Company Name *</Label>
                        <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" />
                      </div>

                      <div>
                        <Label className="text-gray-900">GST No *</Label>
                        <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-900">
                          Authorized Representative Name *
                        </Label>
                        <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" />
                      </div>

                      <div>
                        <Label className="text-gray-900">Mobile No *</Label>
                        <Input
                          className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200"
                          type="tel"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-900">Email Id *</Label>
                        <Input
                          className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200"
                          type="email"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-900">Office Phone No</Label>
                        <Input
                          className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200"
                          type="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-900">Address *</Label>
                      <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Photo Upload */}
                      <div>
                        <Label className="text-gray-900">Photo *</Label>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300 overflow-hidden">
                              {photo ? (
                                <img
                                  src={photo}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <svg
                                  className="w-6 h-6 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "photo")}
                            className="flex-1 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200"
                          />
                        </div>
                      </div>

                      {/* Logo Upload */}
                      <div>
                        <Label className="text-gray-900">Logo</Label>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center border border-gray-300 overflow-hidden">
                            {logo ? (
                              <img
                                src={logo}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            )}
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "logo")}
                            className="flex-1 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <Label className="text-gray-900">Business Type *</Label>
                      <Tabs
                        value={businessType}
                        onValueChange={setBusinessType}
                        className="mt-3"
                      >
                        <TabsList className="w-full flex flex-wrap h-auto gap-2 p-1 bg-gray-100/50 rounded-lg">
                          {Object.entries({
                            manufacturer: "Manufacturer",
                            distributor: "Distributor",
                            agent: "Agent",
                            consultant: "Consultant",
                            wholesaler: "Wholesaler",
                          }).map(([value, label]) => (
                            <TabsTrigger
                              key={value}
                              value={value}
                              className={`flex-1 min-w-[45%] sm:min-w-0 text-sm px-3 py-2 rounded-md transition-all ${
                                businessType === value
                                  ? `${businessTypeColors[value]} font-medium`
                                  : "text-gray-600 hover:text-gray-900 hover:bg-white"
                              }`}
                            >
                              {label}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>

                    <div>
                      <Label className="text-gray-900">Brands (if any)</Label>
                      <Input className="mt-2 bg-white/50 backdrop-blur-sm border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <Separator className="my-6" />

                    <div className="flex items-center justify-end space-x-4">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        className={`relative overflow-hidden transition-all ${
                          membershipCategory === "life-patron"
                            ? "bg-indigo-600 hover:bg-indigo-700"
                            : membershipCategory === "ordinary"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-emerald-600 hover:bg-emerald-700"
                        } text-white`}
                      >
                        <span className="relative z-10">
                          Submit Application
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

// const Highlight = ({ children, className }) => {
//   return (
//     <span className={`relative inline-block ${className}`}>
//       <span className="relative z-10">{children}</span>
//       <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-300/70 -rotate-1 -z-0"></span>
//     </span>
//   );
// };

const Highlight = ({ children, className }) => {
  return (
    <span className={`relative inline-block font-semibold ${className}`}>
      <span className="relative z-10">{children}</span>
  
      <span className="absolute inset-0 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 rounded-lg px-2 py-1 -z-0 blur-sm"></span>
    </span>
  );
};


export default MemberShip;
