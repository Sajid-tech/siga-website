
import React,{ useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextEffect } from "../ui/text-effect";
import { Drawer } from "vaul";
import { Label } from "../ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Star, Users, Check } from "lucide-react";
import useNumericInput from "@/hooks/useNumericInput";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import BASE_URL from "@/config/BaseUrl";
import TextCaptcha from "../customCaptcha/TextCaptcha";

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

const BecomeMember = () => {
  const [membershipCategory, setMembershipCategory] = useState("");
  const [businessType, setBusinessType] = useState("manufacturer");
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [logo, setLogo] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptchaError, setShowCaptchaError] = useState(false);
  const [captchaErrorType, setCaptchaErrorType] = useState("");
   const [transactionId, setTransactionId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const[resMsg,setResMsg]= useState('')
  const [directoryId,setDirectoryId]=useState('')
  const [formData, setFormData] = useState({
    membership_category: "",
    name_of_firm: "",
    gst: "",
    contact_person: "",
    cell_no: "",
    member_image: "",

    contact_person2: "",
    cell_no2: "",
    member_image2: "",

    contact_address: "",
    mail_id: "",
    office_ph_no: "",
    manufacturers: "Manufacturers",
    image: "",
    brands: "",
  });
  const keyDown = useNumericInput();
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const validate = React.useCallback(() => {
    const newErrors = {};
    if (!formData.membership_category) {
      newErrors.membership_category = "Membership Category  is required";
    }
    if (!formData.name_of_firm.trim()) {
      newErrors.name_of_firm = "Company name is required";
    }
    if (!formData.gst.trim()) {
      newErrors.gst = "GST is required";
    }
    if (!formData.contact_person.trim()) {
      newErrors.contact_person = "Authorized Rep Name  is required";
    }
    if (!formData.cell_no.trim()) {
      newErrors.cell_no = "Mobile no is required";
    }

    if (!formData.member_image) {
      newErrors.member_image = "Photo is required";
    }

    if (!formData.contact_address.trim()) {
      newErrors.contact_address = "Address is required";
    }
    if (!formData.mail_id.trim()) {
      newErrors.mail_id = "Email is required";
    }
    
    if (!formData.manufacturers) {
      newErrors.manufacturers = "Business Type is required";
    }

    return newErrors;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));

        const imageUrl = URL.createObjectURL(file);
        if (name === "member_image") {
          setPhoto(imageUrl);
        } else if (name === "image") {
          setLogo(imageUrl);
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  // const handleCategorySelect = (value) => {
  //   setMembershipCategory(value);
  //   setFormData(prev => ({
  //     ...prev,
  //     membership_category: value
  //   }));
  //   setStep(2);
  // };

  const handleCategorySelect = (value) => {
    setMembershipCategory(value);

    let categoryText = "";
    if (value === "life-patron") categoryText = "Life Patron Members";
    else if (value === "ordinary") categoryText = "Ordinary Members";
    else if (value === "associate") categoryText = "Associate Members";

    setFormData((prev) => ({
      ...prev,
      membership_category: categoryText,
    }));
    setStep(2);
  };

  const mapBusinessTypeToText = (value) => {
    switch (value) {
      case "manufacturer":
        return "Manufacturers";
      case "distributorwholesaler":
        return "Distributors Wholesaler";
      case "agent":
        return "Agent";
      case "consultant":
        return "Consultant";
      default:
        return value;
    }
  };

  const handleBusinessTypeChange = (value) => {
    setBusinessType(value);
    const mappedValue = mapBusinessTypeToText(value);
    setFormData((prev) => ({
      ...prev,
      manufacturers: mappedValue,
    }));
    setErrors((prev) => ({
      ...prev,
      manufacturers: "",
    }));
  };
  const membershipMutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(
        `${BASE_URL}/api/create-directory`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    },
    onSuccess: (response) => {
      const res = response.data;

      if (res.code === "201") {
        setResMsg(res.msg)
        setDirectoryId(res?.latestData?.id)
        // setFormData({
        //   membership_category: "",
        //   name_of_firm: "",
        //   gst: "",
        //   contact_person: "",
        //   cell_no: "",
        //   member_image: "",

        //   contact_person2: "",
        //   cell_no2: "",
        //   member_image2: "",

        //   contact_address: "",
        //   mail_id: "",
        //   office_ph_no: "",
        //   manufacturers: "",
        //   image: "",
        //   brands: "",
        // });
        setPhoto(null);
        setLogo(null);
        setStep(3);
          toast.success(res.msg || "Membership request sent successfully! Please complete payment. ✅");
      } else if (res.code === "400") {
        toast.error(res.msg || "Something went wrong ❌");
      } else {
        toast.error(res.msg || "Unknown error occurred ❌");
      }
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message);
      setLoader(false);
    },
  });
  const handleNext = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setShowCaptcha(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
   if (showCaptcha && !captchaVerified) {
      setShowCaptchaError(true);
      setCaptchaErrorType("incomplete");
      return;
    }
    setLoader(true);
    const payload = new FormData();
    payload.append("membership_category", formData.membership_category);
    payload.append("name_of_firm", formData.name_of_firm);
    payload.append("gst", formData.gst);
    payload.append("contact_person", formData.contact_person);
    payload.append("cell_no", formData.cell_no);

    payload.append("member_image", formData.member_image);

    payload.append("contact_person2", formData.contact_person2);
    payload.append("cell_no2", formData.cell_no2);
    payload.append("member_image2", formData.member_image2);
    payload.append("contact_address", formData.contact_address);
    payload.append("mail_id", formData.mail_id);
    payload.append("office_ph_no", formData.office_ph_no);
    payload.append("manufacturers", formData.manufacturers);
    payload.append("image", formData.image);
    payload.append("brands", formData.brands);
    try {
      await membershipMutation.mutateAsync(payload);
      console.log("payload for membership", payload);
    } catch (error) {
      console.error("Error submitting payment mediation form:", error);
    } finally {
      setLoader(false);
    }
  };
  const transactionMutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${BASE_URL}/api/create-directory-payment`, payload);
    },
    onSuccess: (response) => {
      const res = response.data;
      
      if (res.code === "201") {
        setPaymentSuccess(true);
        toast.success(res.msg || "Transaction submitted successfully! ✅");
        
       
        setTimeout(() => {
          setStep(1);
          
          setTransactionId("");
          setDirectoryId("")
          setPaymentSuccess(false);
          setFormData({
            membership_category: "",
            name_of_firm: "",
            gst: "",
            contact_person: "",
            cell_no: "",
            member_image: "",
            contact_person2: "",
            cell_no2: "",
            member_image2: "",
            contact_address: "",
            mail_id: "",
            office_ph_no: "",
            manufacturers: "",
            image: "",
            brands: "",
          });
          setPhoto(null);
          setLogo(null);
        }, 3000);
      } else {
        toast.error(res.msg || "Transaction submission failed ❌");
      }
    },
    onError: (error) => {
      console.error("Error submitting transaction:", error);
      toast.error(error.response?.data?.message || "Transaction submission failed");
    },
  });

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    
    if (!transactionId.trim()) {
      toast.error("Please enter a transaction ID");
      return;
    }
    
   
    const numericPrice = membershipData[membershipCategory]?.price
      .replace('₹', '')
      .replace(',', '');
    
    const payload = {
      directory_id: directoryId,
      directory_membership_category: formData.membership_category,
      directory_payment_transaction: transactionId,
      directory_payment_amount: numericPrice,
  
    };
    
    transactionMutation.mutate(payload);
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
    distributorwholesaler: "bg-blue-100 text-blue-800",
    agent: "bg-emerald-100 text-emerald-800",
    consultant: "bg-amber-100 text-amber-800",
  };

  const handleBack = () => {
    setStep(1);
    setMembershipCategory("");
  };

  const handleBacktoHome = ()=>{
    setStep(1);
    setMembershipCategory("");
            setFormData({
          membership_category: "",
          name_of_firm: "",
          gst: "",
          contact_person: "",
          cell_no: "",
          member_image: "",

          contact_person2: "",
          cell_no2: "",
          member_image2: "",

          contact_address: "",
          mail_id: "",
          office_ph_no: "",
          manufacturers: "",
          image: "",
          brands: "",
        });
  }
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button
          size="lg"
          className="rounded-xl  hover:scale-105  text-yellow-800  px-5 text-base relative overflow-hidden hover:cursor-pointer group"
        >
          <span className="relative z-10">
            <TextEffect preset="scale" per="word">
     
              Click Here
            </TextEffect>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/80 to-white opacity-100 transition-opacity duration-300 -skew-x-12" />
        </Button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <Drawer.Content
          className={` bg-white z-50 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 ${
            membershipCategory
              ? membershipData[membershipCategory]?.borderColor
              : "border-indigo-200"
          } border-t-4`}
        >
          <div className="absolute top-2 right-4 ">
            <Drawer.Close asChild>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </Drawer.Close>
          </div>

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
          </div>

          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300/80 mb-4 mt-4" />

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

              {step === 1 && (
                <>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-center">
                      Choose Your Membership
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      Select the membership category that best fits your needs
                    </p>
                  </div>

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
              ) }
  {step === 2 && (
  <>
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
      {errors.membership_category && (
        <p className="text-red-500 text-xs mt-1">
          {errors.membership_category}
        </p>
      )}

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

  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="name_of_firm"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Company Name *
        </label>
        <input
          type="text"
          id="name_of_firm"
          name="name_of_firm"
          value={formData.name_of_firm}
          onChange={handleChange}
          placeholder="Company name"
          className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 

          ${
            errors.name_of_firm
              ? "border-red-500 focus:ring-red-500"
              : "focus:border-gray-300 focus:ring-indigo-500"
          }
           text-sm py-2 border`}
        />

        {errors.name_of_firm && (
          <p className="text-red-500 text-xs mt-1">
            {errors.name_of_firm}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="gst"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Gst No *
        </label>
        <input
          type="text"
          id="gst"
          name="gst"
   
          minLength={15}
          maxLength={15}
          value={formData.gst}
          onChange={handleChange}
          placeholder="22AAAAA0000A1Z5"
          className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 

${
errors.gst
? "border-red-500 focus:ring-red-500"
: "focus:border-gray-300 focus:ring-indigo-500"
}
text-sm py-2 border`}
        />

        {errors.gst && (
          <p className="text-red-500 text-xs mt-1">
            {errors.gst}
          </p>
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="contact_person"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Authorized Representative Name *
        </label>
        <input
          type="text"
          id="contact_person"
          name="contact_person"
          value={formData.contact_person}
          onChange={handleChange}
          placeholder="Representative name"
          className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 

${
errors.contact_person
? "border-red-500 focus:ring-red-500"
: "focus:border-gray-300 focus:ring-indigo-500"
}
text-sm py-2 border`}
        />

        {errors.contact_person && (
          <p className="text-red-500 text-xs mt-1">
            {errors.contact_person}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="cell_no"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Mobile No *
        </label>
        <input
          type="text"
          id="cell_no"
          name="cell_no"
          onKeyDown={keyDown}
          minLength={10}
          maxLength={10}
          value={formData.cell_no}
          onChange={handleChange}
          placeholder="9876543210"
          className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 

${
errors.cell_no
? "border-red-500 focus:ring-red-500"
: "focus:border-gray-300 focus:ring-indigo-500"
}
text-sm py-2 border`}
        />

        {errors.cell_no && (
          <p className="text-red-500 text-xs mt-1">
            {errors.cell_no}
          </p>
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="mail_id"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Email Id *
        </label>
        <input
          type="text"
          id="mail_id"
          name="mail_id"
          value={formData.mail_id}
          onChange={handleChange}
          placeholder="abc@gmail.com"
          className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 

${
errors.mail_id
? "border-red-500 focus:ring-red-500"
: "focus:border-gray-300 focus:ring-indigo-500"
}
text-sm py-2 border`}
        />

        {errors.mail_id && (
          <p className="text-red-500 text-xs mt-1">
            {errors.mail_id}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="office_ph_no"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Office Phone No 
        </label>
        <input
          type="text"
          id="office_ph_no"
          name="office_ph_no"
          value={formData.office_ph_no}
          onChange={handleChange}
          onKeyDown={keyDown}
          minLength={10}
          maxLength={10}
          placeholder="9876543210"
          className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 

${
errors.office_ph_no
? "border-red-500 focus:ring-red-500"
: "focus:border-gray-300 focus:ring-indigo-500"
}
text-sm py-2 border`}
        />

        {errors.office_ph_no && (
          <p className="text-red-500 text-xs mt-1">
            {errors.office_ph_no}
          </p>
        )}
      </div>
    </div>

    <div>
      <label
        htmlFor="contact_address"
        className="block text-sm font-medium text-gray-900 mb-1"
      >
        Address *
      </label>
      <textarea
        type="text"
        rows={3}
        id="contact_address"
        name="contact_address"
        value={formData.contact_address}
        onChange={handleChange}
        placeholder="Saint St. 128"
        className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 

${
errors.contact_address
? "border-red-500 focus:ring-red-500"
: "focus:border-gray-300 focus:ring-indigo-500"
}
text-sm py-2 border`}
      />

      {errors.contact_address && (
        <p className="text-red-500 text-xs mt-1">
          {errors.contact_address}
        </p>
      )}
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

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            id="member_image"
            name="member_image"
            className={` w-full text-xs sm:text-sm text-gray-500 
file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 
file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold 
file:bg-indigo-50 hover:file:bg-indigo-100
${errors.member_image ? "file:text-red-600" : "file:text-indigo-600"}`}
          />
        </div>
        {errors.member_image && (
          <p className="text-red-500 text-xs mt-1">
            {errors.member_image}
          </p>
        )}
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

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            id="image"
            name="image"
            className={` w-full text-xs sm:text-sm text-gray-500 
file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 
file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold 
file:bg-indigo-50 hover:file:bg-indigo-100
file:text-indigo-600`}
          />
        </div>
      </div>
    </div>

    <Separator className="my-4" />

    <div>
      <label
        htmlFor="manufacturers"
        className="block text-sm font-medium text-gray-900 mb-1"
      >
        Business Type *
      </label>
      <Tabs
        id="manufacturers"
        name="manufacturers"
        value={businessType}
        onValueChange={handleBusinessTypeChange}
        className="mt-3"
      >
        <TabsList className="w-full flex flex-wrap h-auto gap-2 p-1 bg-gray-100/50 rounded-lg">
          {Object.entries({
            manufacturer: "Manufacturer",
            distributorwholesaler: "Distributor/Wholesaler",
            agent: "Agent",
            consultant: "Consultant",
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
      {errors.manufacturers && (
        <p className="text-red-500 text-xs mt-1">
          {errors.manufacturers}
        </p>
      )}
    </div>

    <div>
      <label
        htmlFor="brands"
        className="block text-sm font-medium text-gray-900 mb-1"
      >
        Brands (if any)
      </label>

      <input
        type="text"
        id="brands"
        name="brands"
        value={formData.brands}
        onChange={handleChange}
        placeholder="Brand (if any)"
        className={`px-3  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 

focus:border-gray-300 focus:ring-indigo-500
text-sm py-2 border`}
      />
    </div>

   
    {showCaptcha && (
        <div className=" border-gray-200">
          <TextCaptcha
            onVerify={(isVerified) => {
              setCaptchaVerified(isVerified);
              if (!isVerified) {
                setShowCaptchaError(true);
                setCaptchaErrorType("failed");
              } else {
                setShowCaptchaError(false);
                setCaptchaErrorType("");
              }
            }}
            onRefresh={() => {
              setCaptchaVerified(false);
              setShowCaptchaError(false);
              setCaptchaErrorType("");
            }}
            showVerifyButton={false}
          />
          {showCaptchaError && (
            <p className="text-red-500 text-xs mt-2">
              {captchaErrorType === "failed"
                ? "CAPTCHA verification failed. Please try again."
                : "Please complete the CAPTCHA verification"}
            </p>
          )}
        </div>
      )}

    <div className="flex items-center justify-end space-x-4">
      <Drawer.Close asChild>
        <Button
          type="button"
          variant="ghost"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
        >
          Cancel
        </Button>
      </Drawer.Close>
       {!showCaptcha && (
                                <Button
                                  onClick={handleNext}
                                  className={`relative overflow-hidden transition-all ${
                                    membershipCategory === "life-patron"
                                      ? "bg-indigo-600 hover:bg-indigo-700"
                                      : membershipCategory === "ordinary"
                                      ? "bg-blue-600 hover:bg-blue-700"
                                      : "bg-emerald-600 hover:bg-emerald-700"
                                  } text-white`}
                                >
                                  <span className="relative z-10">Next</span>
                                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Button>
                              )}
                              {showCaptcha && (
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={loader}
        className={`relative overflow-hidden transition-all ${
          membershipCategory === "life-patron"
            ? "bg-indigo-600 hover:bg-indigo-700"
            : membershipCategory === "ordinary"
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-emerald-600 hover:bg-emerald-700"
        } text-white`}
      >
        <span className="relative z-10">
          {loader ? "Submitting..." : " Submit MemberShip"}
        </span>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>
        )}
    </div>
  </div>
</>


  )}

                {step === 3 && (
                <div className="relative max-w-5xl mx-auto bg-white rounded-md shadow-lg overflow-hidden border border-gray-200">
                
                  <div className="p-8 bg-gradient-to-r from-green-50 via-white to-blue-50 border-b border-gray-100">
                    <motion.div
                      className="flex flex-col items-center text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-3xl font-medium text-gray-900">
                        Complete Your Payment
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-2xl">
                        {resMsg} 
                      </p>
                    </motion.div>
                  </div>
              
               
                  <div className="md:flex">
                    
                    <div className="md:w-1/2 p-8 border-r border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                      <motion.div 
                        className={`p-6 rounded-2xl border ${membershipData[membershipCategory]?.borderColor} ${membershipData[membershipCategory]?.bgGradient} shadow-sm`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                      >
                        <div className="flex items-center mb-5">
                          <div className={`p-3 rounded-xl ${membershipData[membershipCategory]?.accentColor} text-white shadow-md`}>
                            {membershipData[membershipCategory]?.icon}
                          </div>
                          <div className="ml-4">
                            <h3 className={`font-semibold text-lg ${membershipData[membershipCategory]?.textColor}`}>
                              {formData.membership_category}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {membershipData[membershipCategory]?.description}
                            </p>
                          </div>
                        </div>
              
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-5"></div>
              
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Membership Type:</span>
                            <span className="font-medium text-gray-900">{formData.membership_category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Company:</span>
                            <span className="font-medium text-gray-900">{formData.name_of_firm}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-bold text-gray-900">
                              {membershipData[membershipCategory]?.price}
                              <span className="text-xs text-gray-500 ml-1">
                                {membershipData[membershipCategory]?.priceNote}
                              </span>
                            </span>
                          </div>
                        </div>
                      </motion.div>
              
                      <motion.div 
                        className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-200 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        <h4 className="font-semibold text-blue-800 mb-3 text-lg">Payment Instructions</h4>
                        <ul className="text-blue-700 space-y-2">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Scan the QR code to make payment</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>After payment, enter the transaction ID below</span>
                          </li>
                        </ul>
                      </motion.div>
                    </div>
              
                 
                    <div className="md:w-1/2 p-8 bg-gradient-to-b from-gray-50 to-white">
                      <motion.div 
                        className="text-center mb-7"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <h3 className="font-medium text-gray-900 text-xl mb-2">Scan to Pay</h3>
                        <p className="text-gray-600">Use any UPI app to scan this code</p>
                      </motion.div>
              
                      <motion.div 
                        className="  mb-7 flex justify-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                      >
                       {membershipData[membershipCategory]?.price == "₹20,000" ? (
  <>
  <img
            src="/siga20k.png"
            alt="20000 Payment QR Code"
            className="w-64 h-64 border rounded-lg"
          />
  </>
):(
  <>
    <img
            src="/siga2k.png"
            alt="2000 Payment QR Code"
            className="w-64 h-64 border rounded-lg"
          />
  </>
)}
                      </motion.div>
              
                      <motion.form 
                        onSubmit={handleTransactionSubmit} 
                        className="space-y-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      >
                        <div>
                          <label htmlFor="directory_payment_transaction" className="block text-sm font-medium text-gray-700 mb-2">
                            Transaction ID *
                          </label>
                          <input
                            type="text"
                            id="directory_payment_transaction"
                            name="directory_payment_transaction"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter your transaction ID"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            required
                          />
                        </div>
              
                        <Button
                          type="button"
                          onClick={handleTransactionSubmit}
                          disabled={paymentSuccess || transactionMutation.isLoading}
                          className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all flex items-center justify-center shadow-md ${
                            paymentSuccess
                              ? "bg-green-600 cursor-not-allowed"
                              : `${membershipData[membershipCategory]?.accentColor} hover:opacity-90 hover:shadow-lg`
                          }`}
                        >
                          {transactionMutation.isLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </>
                          ) : paymentSuccess ? (
                            "Payment Verified ✓"
                          ) : (
                            "Submit Transaction ID"
                          )}
                        </Button>
              
                        {paymentSuccess && (
                          <motion.div 
                            className="mt-4 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <p className="text-green-600 font-medium">
                              Redirecting to homepage...
                            </p>
                          </motion.div>
                        )}
                      </motion.form>
                    </div>
                  </div>
              
                  {/* Footer */}
                  <div className="p-5 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleBacktoHome}
                        className="text-gray-600 hover:text-gray-900 flex items-center transition-colors font-medium"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Membership Selection
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BecomeMember;
