import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/event-card";
import { cn } from "@/lib/utils";
import {
  Building,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  Calendar,
  DollarSign,
} from "lucide-react";
import useNumericInput from "@/hooks/useNumericInput";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import BASE_URL from "@/config/BaseUrl";
import Disclaimer from "@/components/disclaimer/Disclaimer";

const PaymentMediation = () => {
  const [formData, setFormData] = useState({
    company_firm: "",
    address: "",
    contact_name: "",
    contact_mobile: "",
    contact_email: "",
    d_company_firm: "",
    d_address: "",
    d_contact_name: "",
    d_contact_mobile: "",
    d_contact_email: "",
    due_amount: "",
    pending_from: "",
    ledger: null,
    authorisation_letter: null,
    agreeToTerms: false,
  });
  const keyDown = useNumericInput();
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.company_firm.trim()) {
      newErrors.company_firm = "Company/Firm name  is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.contact_name.trim()) {
      newErrors.contact_name = "Contact name is required";
    }
    if (!formData.contact_mobile.trim()) {
      newErrors.contact_mobile = "Mobile no is required";
    }
    if (!formData.contact_email.trim()) {
      newErrors.contact_email = "Email is required";
    }

    if (!formData.d_company_firm.trim()) {
      newErrors.d_company_firm = "Company/Firm is required";
    }
    if (!formData.d_address.trim()) {
      newErrors.d_address = "Address is required";
    }
    if (!formData.d_contact_name.trim()) {
      newErrors.d_contact_name = "Contact name is required";
    }
    if (!formData.d_contact_mobile.trim()) {
      newErrors.d_contact_mobile = "Mobile no is required";
    }
    if (!formData.d_contact_email.trim()) {
      newErrors.d_contact_email = "Email is required";
    }
    if (!formData.due_amount.trim()) {
      newErrors.due_amount = "Due Amount is required";
    }
    if (!formData.pending_from.trim()) {
      newErrors.pending_from = "Pending From is required";
    }
    if (!formData.ledger) {
      newErrors.ledger = "Ledger is required";
    }
    if (!formData.authorisation_letter) {
      newErrors.authorisation_letter = "Authorisation letter is required";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Terms & Condition Required";
    }

    return newErrors;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
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
  const paymenttMutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(
       `${BASE_URL}/api/create-duereconcilation`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    },
    onSuccess: (response) => {
      console.log("Contact form submitted successfully", response);

      const res = response.data;

      if (res.code === "201") {
        setFormData({
            company_firm: "",
            address: "",
            contact_name: "",
            contact_mobile: "",
            contact_email: "",
            d_company_firm: "",
            d_address: "",
            d_contact_name: "",
            d_contact_mobile: "",
            d_contact_email: "",
            due_amount: "",
            pending_from: "",
            ledger: null,
            authorisation_letter: null,
            agreeToTerms: false
        });
        toast.success(res.msg || "Payment Mediation sent successfully! ✅");
      } else if (res.code === "400") {
        toast.error(res.heading || "Something went wrong ❌");
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoader(true);
    const payload = new FormData();
    payload.append("company_firm", formData.company_firm);
    payload.append("address", formData.address);
    payload.append("contact_name", formData.contact_name);
    payload.append("contact_mobile", formData.contact_mobile);
    payload.append("contact_email", formData.contact_email);
    payload.append("d_company_firm", formData.d_company_firm);
    payload.append("d_address", formData.d_address);
    payload.append("d_contact_name", formData.d_contact_name);
    payload.append("d_contact_mobile", formData.d_contact_mobile);
    payload.append("d_contact_email", formData.d_contact_email);
    payload.append("due_amount", formData.due_amount);
    payload.append("pending_from", formData.pending_from);
    payload.append("ledger", formData.ledger);
    payload.append("authorisation_letter", formData.authorisation_letter);
    try {
      await paymenttMutation.mutateAsync(payload);
      console.log("Form submitted:", payload);
    } catch (error) {
      console.error("Error submitting payment mediation form:", error);
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
  
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            SIGA <Highlight>Payment Mediation</Highlight>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            SIGA assist members to resolve the conflict/disputes with their
            buyers/purchaser for recovery of pending payments.
          </p>
        </div>

        {/* Form Section */}
        <FeatureCard>
          <CardHeader className="pb-2 sm:pb-4">
            <CardHeading
              icon={DollarSign}
              title="Payment Mediation"
              description="Submit your payment dispute details"
            />
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 sm:space-y-8 p-3 sm:p-4"
            >
              {/* Supplier's Details Section */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
                  Supplier's Details
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="company_firm"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company/Firm Name *
                    </label>
                    <div className="">
                      <input
                        type="text"
                        id="company_firm"
                        name="company_firm"
                        value={formData.company_firm}
                        onChange={handleChange}
                        placeholder="Company/Firm "
                        className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                            
                            ${
                              errors.company_firm
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-yellow-500 focus:ring-yellow-500"
                            }
                             text-sm py-2 border`}
                      />
                      {errors.company_firm && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.company_firm}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label
                      htmlFor="contact_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Contact Name *
                    </label>
                    <div className="">
                      <input
                        type="text"
                        id="contact_name"
                        name="contact_name"
                        value={formData.contact_name}
                        onChange={handleChange}
                        placeholder="Contact Name"
                        className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                              ${
                                errors.contact_name
                                  ? "border-red-500 focus:ring-red-500"
                                  : "focus:border-yellow-500 focus:ring-yellow-500"
                              } text-sm  border`}
                      />

                      {errors.contact_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.contact_name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="contact_mobile"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile No *
                    </label>
                    <div className="">
                      <input
                        type="tel"
                        id="contact_mobile"
                        name="contact_mobile"
                        value={formData.contact_mobile}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                            
                            ${
                              errors.contact_mobile
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-yellow-500 focus:ring-yellow-500"
                            }
                             text-sm py-2 border`}
                      />
                      {errors.contact_mobile && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.contact_mobile}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact_email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Id *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="contact_email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={handleChange}
                        placeholder="abc@gmail.com "
                        className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                            
                            ${
                              errors.contact_email
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-yellow-500 focus:ring-yellow-500"
                            }
                             text-sm py-2 border`}
                      />
                      {errors.contact_email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.contact_email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address *
                  </label>
                  <div>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      placeholder="Jhon st. 128"
                      value={formData.address}
                      onChange={handleChange}
                      className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                            
                        ${
                          errors.address
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:border-yellow-500 focus:ring-yellow-500"
                        }
                         text-sm py-2 border`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Buyer's Details Section */}
              <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
                  Buyer's Details
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="d_company_firm"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company/Firm Name *
                    </label>
                    <div className="">
                      <input
                        type="text"
                        id="d_company_firm"
                        name="d_company_firm"
                        value={formData.d_company_firm}
                        onChange={handleChange}
                        placeholder="Company/Firm"
                        className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                            
                            ${
                              errors.d_company_firm
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-yellow-500 focus:ring-yellow-500"
                            }
                             text-sm py-2 border`}
                      />
                      {errors.d_company_firm && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.d_company_firm}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Contact Name */}
                  <div>
                    <label
                      htmlFor="d_contact_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Contact Name *
                    </label>
                    <div className="">
                      <input
                        type="text"
                        id="d_contact_name"
                        name="d_contact_name"
                        value={formData.d_contact_name}
                        onChange={handleChange}
                        placeholder="abcd"
                        className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                            
                            ${
                              errors.d_contact_name
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-yellow-500 focus:ring-yellow-500"
                            }
                             text-sm py-2 border`}
                      />
                      {errors.d_contact_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.d_contact_name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="d_contact_mobile"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile No *
                    </label>
                    <div className="">
                      <input
                        type="tel"
                        id="d_contact_mobile"
                        name="d_contact_mobile"
                        value={formData.d_contact_mobile}
                        onChange={handleChange}
                        placeholder="9876543210 "
                        className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                            
                            ${
                              errors.d_contact_mobile
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-yellow-500 focus:ring-yellow-500"
                            }
                             text-sm py-2 border`}
                      />
                      {errors.d_contact_mobile && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.d_contact_mobile}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="d_contact_email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Id *
                    </label>
                    <div className="">
                      <input
                        type="email"
                        id="d_contact_email"
                        name="d_contact_email"
                        value={formData.d_contact_email}
                        onChange={handleChange}
                        placeholder="abc@gmail.com "
                        className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                            
                            ${
                              errors.d_contact_email
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-yellow-500 focus:ring-yellow-500"
                            }
                             text-sm py-2 border`}
                      />
                      {errors.d_contact_email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.d_contact_email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="d_address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address *
                  </label>
                  <div className="">
                    <textarea
                      id="d_address"
                      name="d_address"
                      rows={3}
                      value={formData.d_address}
                      onChange={handleChange}
                      placeholder="Jhon St. 128 "
                      className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                          
                          ${
                            errors.d_address
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:border-yellow-500 focus:ring-yellow-500"
                          }
                           text-sm py-2 border`}
                    />
                    {errors.d_address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.d_address}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Due Reconciliation Section */}
              <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
                  Due Reconciliation
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Due Amount */}
                  <div>
                    <label
                      htmlFor="due_amount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Due Amount *
                    </label>
                    <div className="">
                      <input
                        type="text"
                        id="due_amount"
                        name="due_amount"
                        value={formData.due_amount}
                        onChange={handleChange}
                        placeholder="123456 "
                        className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                            
                            ${
                              errors.due_amount
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-yellow-500 focus:ring-yellow-500"
                            }
                             text-sm py-2 border`}
                      />
                      {errors.due_amount && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.due_amount}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pending From */}
                  <div>
                    <label
                      htmlFor="pending_from"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Pending From *
                    </label>
                    <div className="">
                      <input
                        type="date"
                        id="pending_from"
                        name="pending_from"
                        value={formData.pending_from}
                        onChange={handleChange}
                        className={`px-3 py-2  w-full rounded-md border-gray-300 shadow-sm  focus:outline-none focus:ring-1 
                            
                            ${
                              errors.pending_from
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-yellow-500 focus:ring-yellow-500"
                            }
                             text-sm py-2 border`}
                      />
                      {errors.pending_from && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.pending_from}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ledger File */}
                  <div>
                    <label
                      htmlFor="ledger"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ledger (Min. 3 Years) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        type="file"
                        id="ledger"
                        name="ledger"
                        onChange={handleChange}
                        className={`pl-9 sm:pl-10 block w-full text-xs sm:text-sm text-gray-500 
                            file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 
                            file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold 
                            file:bg-yellow-50 hover:file:bg-yellow-100
                            ${
                              errors.ledger
                                ? "file:text-red-600"
                                : "file:text-yellow-700"
                            }`}
                      />
                      {errors.ledger && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.ledger}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Authorization Letter */}
                  <div>
                    <label
                      htmlFor="authorisation_letter"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Authorisation Letter *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        type="file"
                        id="authorisation_letter"
                        name="authorisation_letter"
                        onChange={handleChange}
                        className={`pl-9 sm:pl-10 block w-full text-xs sm:text-sm text-gray-500 
    file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 
    file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold 
    file:bg-yellow-50 hover:file:bg-yellow-100
    ${
      errors.authorisation_letter ? "file:text-red-600" : "file:text-yellow-700"
    }`}
                      />

                      {errors.authorisation_letter && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.authorisation_letter}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="pt-4 sm:pt-6 border-t border-gray-200">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className={`h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-300 
    focus:ring-0 
    ${errors.agreeToTerms ? "text-red-600 " : "text-yellow-600"}`}
                    />
                  </div>
                  <div className="ml-2 sm:ml-3 text-xs sm:text-sm">
                    <label
                      htmlFor="agreeToTerms"
                      className="font-medium text-gray-700"
                    >
                      I have read, understood and agree to the 
                       <Disclaimer title="terms-condition" />
                    </label>
                    {errors.agreeToTerms && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.agreeToTerms}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <motion.button
                  type="submit"
                  disabled={loader}
                  className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                 
                  {loader
                      ? "Submitting..."
                      : " Submit Payment Mediation Request"}
                </motion.button>
              </div>
            </form>
          </CardContent>
        </FeatureCard>
      </div>
    </div>
  );
};

export default PaymentMediation;

const Highlight = ({ children, className }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-2 bg-red-300/70 -rotate-1 -z-0"></span>
    </span>
  );
};
