import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/event-card";
import { cn } from "@/lib/utils";
import {
  Briefcase,
 
  User,
  
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const JobOfferForm = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    company_type: "",
    location: "",
    company_address: "",
    profile_employee: "",
    other_job: "",
    appx_exp: "",
    appx_sal: "",
    contact_name: "",
    contact_mobile: "",
    contact_email: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company/Firm name is required";
    }
    if (!formData.company_type.trim()) {
      newErrors.company_type = "Company/Firm type is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.company_address.trim()) {
      newErrors.company_address = "Company/Firm address is required";
    }
    if (!formData.profile_employee.trim()) {
      newErrors.profile_employee = "Vacancy profile is required";
    }
    if (formData.profile_employee === "Any Other You want to specify" && !formData.other_job.trim()) {
      newErrors.other_job = "Please specify the job profile";
    }
    if (!formData.appx_exp.trim()) {
      newErrors.appx_exp = "Experience is required";
    }
    if (!formData.appx_sal.trim()) {
      newErrors.appx_sal = "Salary package is required";
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
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Terms & Condition Required";
    }

    return newErrors;
  }, [formData]);

  const companyTypes = [
    "Manufacturing",
    "Logistics",
    "Trade",
    "Services",
    "Accountancy",
    "IT Sector",
    "Hospitality Services",
  ];

  const vacancyProfiles = [
    "Salesman",
    "Accountant",
    "Clerical",
    "Marketing",
    "Factory Worker",
    "Managerial Position",
    "Security",
    "Driver (Car/Goods Vehicle)",
    "Housemaid",
    "Tele Marketing",
    "Any Other You want to specify",
  ];

  const salaryPackages = [
    "Below 20000",
    "20000 to 25000",
    "25000 to 35000",
    "35000 to 50000",
    "Above 50000",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const jobOfferMutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(
        "https://southindiagarmentsassociation.com/public/api/create-job-offered",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    },
    onSuccess: (response) => {
      console.log("Job offer form submitted successfully", response);

      const res = response.data;

      if (res.code === "201") {
        setFormData({
          company_name: "",
          company_type: "",
          location: "",
          company_address: "",
          profile_employee: "",
          other_job: "",
          appx_exp: "",
          appx_sal: "",
          contact_name: "",
          contact_mobile: "",
          contact_email: "",
          agreeToTerms: false,
        });
        toast.success(res.msg || "Job offer submitted successfully! ✅");
      } else if (res.code === "400") {
        toast.error(res.heading || "Something went wrong ❌");
      } else {
        toast.error(res.msg || "Unknown error occurred ❌");
      }
      setLoader(false);
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Failed to submit job offer");
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
    payload.append("company_name", formData.company_name);
    payload.append("company_type", formData.company_type);
    payload.append("location", formData.location);
    payload.append("company_address", formData.company_address);
    payload.append("profile_employee", formData.profile_employee);

      payload.append("other_job", formData.other_job);

    payload.append("appx_exp", formData.appx_exp);
    payload.append("appx_sal", formData.appx_sal);
    payload.append("contact_name", formData.contact_name);
    payload.append("contact_mobile", formData.contact_mobile);
    payload.append("contact_email", formData.contact_email);

    await jobOfferMutation.mutateAsync(payload);
  };

  const CardHeading = useCallback(
    ({ icon: Icon, title, description }) => (
      <div className="px-2">
        <span className="text-muted-foreground flex items-center gap-2">
          <Icon className="size-4" />
          {title}
        </span>
        <p className="mt-2 text-xl sm:text-2xl font-semibold">{description}</p>
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
    <div className="relative w-full bg-white   overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto   py-6 sm:py-8">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Post a{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Job Opening</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300/70 -rotate-1 -z-0"></span>
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to post your job requirements
          </p>
        </motion.div>

        <FeatureCard>
          <CardHeader className="pb-2 sm:pb-4 ">
            <CardHeading
              icon={Briefcase}
              title="Employer Details"
              description="Company/Firm Information"
            />
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6 p-2 sm:p-4 "
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <label
                    htmlFor="company_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Name *
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 
                        ${
                          errors.company_name
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:border-yellow-500 focus:ring-yellow-500"
                        } text-sm py-2 border`}
                    />
                    {errors.company_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.company_name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company Type */}
                <div>
                  <label
                    htmlFor="company_type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company/Firm Type *
                  </label>
                  <select
                    id="company_type"
                    name="company_type"
                    value={formData.company_type}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none border
                      ${
                        errors.company_type
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      }`}
                  >
                    <option value="">Select company type</option>
                    {companyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.company_type && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.company_type}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="company_address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company/Firm Address *
                </label>
                <div className="">
                  <textarea
                    id="company_address"
                    name="company_address"
                    rows={3}
                    value={formData.company_address}
                    onChange={handleChange}
                    placeholder="Company Address"
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 px-3 py-2 text-sm border
                      ${
                        errors.company_address
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:border-yellow-500 focus:ring-yellow-500"
                      }`}
                  />
                  {errors.company_address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.company_address}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Location */}
                <div className="col-span-1 lg:col-span-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location of Company/Firm *
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Location"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm border
                        ${
                          errors.location
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:border-yellow-500 focus:ring-yellow-500"
                        }`}
                    />
                    {errors.location && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Vacancy Profile */}
                <div>
                  <label
                    htmlFor="profile_employee"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Vacancy Profile *
                  </label>
                  <select
                    id="profile_employee"
                    name="profile_employee"
                    value={formData.profile_employee}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none border
                      ${
                        errors.profile_employee
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      }`}
                  >
                    <option value="">Select vacancy profile</option>
                    {vacancyProfiles.map((profile) => (
                      <option key={profile} value={profile}>
                        {profile}
                      </option>
                    ))}
                  </select>
                  {errors.profile_employee && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profile_employee}
                    </p>
                  )}
                </div>
              </div>

              {/* Other Job Field (appears when "Any Other You want to specify" is selected) */}
              {formData.profile_employee === "Any Other You want to specify" && (
                <div>
                  <label
                    htmlFor="other_job"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Specify Job Profile *
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="other_job"
                      name="other_job"
                      value={formData.other_job}
                      onChange={handleChange}
                      placeholder="Specify job profile"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm border
                        ${
                          errors.other_job
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:border-yellow-500 focus:ring-yellow-500"
                        }`}
                    />
                    {errors.other_job && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.other_job}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Experience Required */}
                <div>
                  <label
                    htmlFor="appx_exp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Experience Required (in Years) *
                  </label>
                  <div className="">
                    <input
                      type="number"
                      id="appx_exp"
                      name="appx_exp"
                      min="0"
                      value={formData.appx_exp}
                      onChange={handleChange}
                      placeholder="Years of experience"
                      className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm border
                        ${
                          errors.appx_exp
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:border-yellow-500 focus:ring-yellow-500"
                        }`}
                    />
                    {errors.appx_exp && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.appx_exp}
                      </p>
                    )}
                  </div>
                </div>

                {/* Salary Package */}
                <div>
                  <label
                    htmlFor="appx_sal"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Approx Salary Package (per Month) *
                  </label>
                  <select
                    id="appx_sal"
                    name="appx_sal"
                    value={formData.appx_sal}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none border
                      ${
                        errors.appx_sal
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      }`}
                  >
                    <option value="">Select salary package</option>
                    {salaryPackages.map((pkg) => (
                      <option key={pkg} value={pkg}>
                        {pkg}
                      </option>
                    ))}
                  </select>
                  {errors.appx_sal && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.appx_sal}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <User className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-2" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Contact Name */}
                  <div className="mb-3 sm:mb-4">
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
                        className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm border
                          ${
                            errors.contact_name
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:border-yellow-500 focus:ring-yellow-500"
                          }`}
                      />
                      {errors.contact_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.contact_name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="mb-3 sm:mb-4">
                    <label
                      htmlFor="contact_mobile"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile *
                    </label>
                    <div className="">
                      <input
                        type="tel"
                        id="contact_mobile"
                        name="contact_mobile"
                        value={formData.contact_mobile}
                        onChange={handleChange}
                        placeholder="Mobile Number"
                        className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm border
                          ${
                            errors.contact_mobile
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:border-yellow-500 focus:ring-yellow-500"
                          }`}
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
                      Email *
                    </label>
                    <div className="">
                      <input
                        type="contact_email"
                        id="contact_email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className={`px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm border
                          ${
                            errors.contact_email
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:border-yellow-500 focus:ring-yellow-500"
                          }`}
                      />
                      {errors.contact_email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.contact_email}
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
                      I have read, understood and agree to the disclaimer
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
                  className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loader ? "Submitting..." : "Submit Job Opening"}
                </motion.button>
              </div>
            </form>
          </CardContent>
        </FeatureCard>
      </div>
    </div>
  );
};

export default JobOfferForm;