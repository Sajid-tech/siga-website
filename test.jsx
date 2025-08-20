



here is my refrence code "import React, { useCallback, useState } from "react";
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

const Highlight = ({ children, className }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-2 bg-red-300/70 -rotate-1 -z-0"></span>
    </span>
  );
};
 " and here is my code of JobRequireForm "import React, { useCallback, useState } from 'react';
 import { motion } from 'framer-motion';
 import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
 import { cn } from '@/lib/utils';
 import { User, Mail, Phone, Home, Briefcase, FileText, Car, Calendar } from 'lucide-react';
 
 const JobRequireForm = () => {
     const [formData, setFormData] = useState({
         fullName: '',
         fatherName: '',
         email: '',
         mobile: '',
         education: '',
         houseAddress: '',
         currentCity: '',
         willingToRelocate: '',
         lastEmployedBy: '',
         contactPerson: '',
         designation: '',
         companyPhone: '',
         companyAddress: '',
         lastSalary: '',
         expectedSalary: '',
         jobLostDate: '',
         dependents: '',
         pandemicLoss: '',
         preferredJobProfile: [],
         drivingLicense: '',
         drivingKnowledge: '',
         vehicleOwned: '',
         agreeToTerms: false
     });
 
     const jobProfiles = [
         'Salesman',
         'Accountant',
         'Clerical',
         'Marketing',
         'Factory Worker',
         'Managerial Position',
         'Security',
         'Driver (Car/Goods Vehicle)',
         'Housemaid',
         'Tele Marketing',
         'Other'
     ];
 
     const handleChange = (e) => {
         const { name, value, type, checked } = e.target;
         
         if (type === 'checkbox') {
             // Handle checkbox for preferred job profile
             if (name === 'preferredJobProfile') {
                 setFormData(prev => {
                     const newProfiles = checked 
                         ? [...prev.preferredJobProfile, value]
                         : prev.preferredJobProfile.filter(item => item !== value);
                     return { ...prev, preferredJobProfile: newProfiles };
                 });
             } else {
                 setFormData(prev => ({ ...prev, [name]: checked }));
             }
         } else {
             setFormData(prev => ({ ...prev, [name]: value }));
         }
     };
 
     const handleSubmit = (e) => {
         e.preventDefault();
         // Handle form submission logic here
         console.log('Form submitted:', formData);
     };
 
     const CardHeading = useCallback(({ icon: Icon, title, description }) => (
         <div className="px-2">
             <span className="text-muted-foreground flex items-center gap-2">
                 <Icon className="size-3 sm:size-4" />
                 {title}
             </span>
             <p className="mt-2 text-xl sm:text-2xl font-semibold">{description}</p>
         </div>
     ),[]);
 
     const FeatureCard = useCallback(({ children, className }) => (
         <Card className={cn('group relative rounded-none shadow-zinc-950/5', className)}>
             <CardDecorator />
             {children}
         </Card>
     ),[]);
 
     const CardDecorator = useCallback(() => (
         <>
             <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
             <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
             <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
             <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
         </>
     ),[]);
 
     return (
         <div className="relative w-full bg-white overflow-hidden">
             <div className="relative z-10 max-w-4xl mx-auto  py-4 sm:py-8">
                 <motion.div 
                     className="text-center mb-8 sm:mb-12"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}
                     viewport={{ once: true }}
                 >
                     <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                         Job Seeker <span className="relative inline-block">
                             <span className="relative z-10">Registration</span>
                             <span className="absolute bottom-0 left-0 w-full h-2 bg-purple-300/70 -rotate-1 -z-0"></span>
                         </span>
                     </h1>
                     <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                         Fill out the form below to submit your resume
                     </p>
                 </motion.div>
 
                 <FeatureCard>
                     <CardHeader className="pb-2 sm:pb-4">
                         <CardHeading
                             icon={User}
                             title="Job Seeker"
                             description="Personal Information"
                         />
                     </CardHeader>
                     <CardContent>
                         <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-2 sm:p-4">
                             {/* Personal Information Section */}
                             <div className="space-y-3 sm:space-y-4">
                                 <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                                     <User className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-2" />
                                     Personal Details
                                 </h3>
                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                 {/* Full Name */}
                                 <div>
                                     <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                         Full Name *
                                     </label>
                                     <div className="relative">
                                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                             <User className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                                         </div>
                                         <input
                                             type="text"
                                             id="fullName"
                                             name="fullName"
                                             value={formData.fullName}
                                             onChange={handleChange}
                                             className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 border"
                                             required
                                         />
                                     </div>
                                 </div>
 
                                 {/* Father Name */}
                                 <div>
                                     <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
                                         Father Name *
                                     </label>
                                     <input
                                         type="text"
                                         id="fatherName"
                                         name="fatherName"
                                         value={formData.fatherName}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                         required
                                     />
                                 </div>
 
                                 {/* Email */}
                                 <div>
                                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                         Email *
                                     </label>
                                     <div className="relative">
                                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                             <Mail className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                                         </div>
                                         <input
                                             type="email"
                                             id="email"
                                             name="email"
                                             value={formData.email}
                                             onChange={handleChange}
                                             className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 border"
                                             required
                                         />
                                     </div>
                                 </div>
                                 </div>
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                 {/* Mobile */}
                                 <div>
                                     <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                                         Mobile *
                                     </label>
                                     <div className="relative">
                                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                             <Phone className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                                         </div>
                                         <input
                                             type="tel"
                                             id="mobile"
                                             name="mobile"
                                             value={formData.mobile}
                                             onChange={handleChange}
                                             className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 border"
                                             required
                                         />
                                     </div>
                                 </div>
 
                                 {/* Education */}
                                 <div>
                                     <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                                         Education *
                                     </label>
                                     <input
                                         type="text"
                                         id="education"
                                         name="education"
                                         value={formData.education}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                         required
                                     />
                                 </div>
                                 </div>
                                 {/* House Address */}
                                 <div>
                                     <label htmlFor="houseAddress" className="block text-sm font-medium text-gray-700 mb-1">
                                         House Address *
                                     </label>
                                     <div className="relative">
                                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                             <Home className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                                         </div>
                                         <textarea
                                             id="houseAddress"
                                             name="houseAddress"
                                             rows={3}
                                             value={formData.houseAddress}
                                             onChange={handleChange}
                                             className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base border p-2"
                                             required
                                         />
                                     </div>
                                 </div>
 
                                 {/* Current City */}
                                 <div>
                                     <label htmlFor="currentCity" className="block text-sm font-medium text-gray-700 mb-1">
                                         Current City *
                                     </label>
                                     <input
                                         type="text"
                                         id="currentCity"
                                         name="currentCity"
                                         value={formData.currentCity}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                         required
                                     />
                                 </div>
 
                                 {/* Willing to Relocate */}
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-2">
                                         Are you willing to re-locate? *
                                     </label>
                                     <div className="space-y-2">
                                         <div className="flex items-center">
                                             <input
                                                 id="relocate-yes"
                                                 name="willingToRelocate"
                                                 type="radio"
                                                 value="Yes"
                                                 checked={formData.willingToRelocate === 'Yes'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                                 required
                                             />
                                             <label htmlFor="relocate-yes" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 Yes I am ready to re-locate
                                             </label>
                                         </div>
                                         <div className="flex items-center">
                                             <input
                                                 id="relocate-no"
                                                 name="willingToRelocate"
                                                 type="radio"
                                                 value="No"
                                                 checked={formData.willingToRelocate === 'No'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="relocate-no" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 No, I am not ready to re-locate
                                             </label>
                                         </div>
                                     </div>
                                 </div>
                             </div>
 
                             {/* Employment History Section */}
                             <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
                                 <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                                     <Briefcase className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-2" />
                                     Employment History
                                 </h3>
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                 {/* Last Employed By */}
                                 <div>
                                     <label htmlFor="lastEmployedBy" className="block text-sm font-medium text-gray-700 mb-1">
                                         Last Employed by Company/Firm
                                     </label>
                                     <input
                                         type="text"
                                         id="lastEmployedBy"
                                         name="lastEmployedBy"
                                         value={formData.lastEmployedBy}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                     />
                                 </div>
 
                                 {/* Contact Person */}
                                 <div>
                                     <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                                         Contact Person
                                     </label>
                                     <input
                                         type="text"
                                         id="contactPerson"
                                         name="contactPerson"
                                         value={formData.contactPerson}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                     />
                                 </div>
                               </div>
                               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                 {/* Designation */}
                                 <div>
                                     <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                                         Designation
                                     </label>
                                     <input
                                         type="text"
                                         id="designation"
                                         name="designation"
                                         value={formData.designation}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                     />
                                 </div>
 
                                 {/* Company Phone */}
                                 <div>
                                     <label htmlFor="companyPhone" className="block text-sm font-medium text-gray-700 mb-1">
                                         Phone
                                     </label>
                                     <input
                                         type="tel"
                                         id="companyPhone"
                                         name="companyPhone"
                                         value={formData.companyPhone}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                     />
                                 </div>
                    </div>
                                 {/* Company Address */}
                                 <div>
                                     <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                                         Address
                                     </label>
                                     <textarea
                                         id="companyAddress"
                                         name="companyAddress"
                                         rows={3}
                                         value={formData.companyAddress}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base border p-2"
                                     />
                                 </div>
                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                 {/* Last Salary */}
                                 <div>
                                     <label htmlFor="lastSalary" className="block text-sm font-medium text-gray-700 mb-1">
                                         Last Salary Drawn (per Month)
                                     </label>
                                     <input
                                         type="text"
                                         id="lastSalary"
                                         name="lastSalary"
                                         value={formData.lastSalary}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                     />
                                 </div>
 
                                 {/* Expected Salary */}
                                 <div>
                                     <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-1">
                                         Expected Salary (per Month)
                                     </label>
                                     <input
                                         type="text"
                                         id="expectedSalary"
                                         name="expectedSalary"
                                         value={formData.expectedSalary}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                     />
                                 </div>
 
                                 {/* Job Lost Date */}
                                 <div>
                                     <label htmlFor="jobLostDate" className="block text-sm font-medium text-gray-700 mb-1">
                                         When did you lose your job
                                     </label>
                                     <div className="relative">
                                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                             <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                                         </div>
                                         <input
                                             type="date"
                                             id="jobLostDate"
                                             name="jobLostDate"
                                             value={formData.jobLostDate}
                                             onChange={handleChange}
                                             className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 border"
                                         />
                                     </div>
                                 </div>
                                 </div>
                                 
                             </div>
 
                             {/* Family Information Section */}
                             <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
                                 <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                                     <User className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-2" />
                                     Family Information
                                 </h3>
 
                                 {/* Dependents */}
                                 <div>
                                     <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 mb-1">
                                         No of Dependants in Family
                                     </label>
                                     <input
                                         type="number"
                                         id="dependents"
                                         name="dependents"
                                         min="0"
                                         value={formData.dependents}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                     />
                                 </div>
 
                                 {/* Pandemic Loss */}
                                 <div>
                                     <label htmlFor="pandemicLoss" className="block text-sm font-medium text-gray-700 mb-1">
                                         Have you lost any person in this pandemic – Relationship with the deceased
                                     </label>
                                     <textarea
                                         id="pandemicLoss"
                                         name="pandemicLoss"
                                         rows={3}
                                         value={formData.pandemicLoss}
                                         onChange={handleChange}
                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base border p-2"
                                     />
                                 </div>
                             </div>
 
                             {/* Job Preferences Section */}
                             <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
                                 <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                                     <Briefcase className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-2" />
                                     Job Preferences
                                 </h3>
 
                                 {/* Preferred Job Profile */}
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-2">
                                         Would you prefer any of the following job profile
                                     </label>
                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                         {jobProfiles.map(profile => (
                                             <div key={profile} className="flex items-center">
                                                 <input
                                                     id={`profile-${profile}`}
                                                     name="preferredJobProfile"
                                                     type="checkbox"
                                                     value={profile}
                                                     checked={formData.preferredJobProfile.includes(profile)}
                                                     onChange={handleChange}
                                                     className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                                                 />
                                                 <label htmlFor={`profile-${profile}`} className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                     {profile}
                                                 </label>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                 {/* Driving License */}
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-2">
                                         Have you got a driving licence
                                     </label>
                                     <div className="space-y-2">
                                         <div className="flex items-center">
                                             <input
                                                 id="license-two-wheeler"
                                                 name="drivingLicense"
                                                 type="radio"
                                                 value="Two Wheeler"
                                                 checked={formData.drivingLicense === 'Two Wheeler'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="license-two-wheeler" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 Two Wheeler
                                             </label>
                                         </div>
                                         <div className="flex items-center">
                                             <input
                                                 id="license-lmv"
                                                 name="drivingLicense"
                                                 type="radio"
                                                 value="LMV"
                                                 checked={formData.drivingLicense === 'LMV'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="license-lmv" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 LMV
                                             </label>
                                         </div>
                                         <div className="flex items-center">
                                             <input
                                                 id="license-hmv"
                                                 name="drivingLicense"
                                                 type="radio"
                                                 value="HMV"
                                                 checked={formData.drivingLicense === 'HMV'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="license-hmv" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 HMV
                                             </label>
                                         </div>
                                         <div className="flex items-center">
                                             <input
                                                 id="license-none"
                                                 name="drivingLicense"
                                                 type="radio"
                                                 value="No License"
                                                 checked={formData.drivingLicense === 'No License'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="license-none" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 No, I don't have a licence
                                             </label>
                                         </div>
                                     </div>
                                 </div>
 
                                 {/* Driving Knowledge */}
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-2">
                                         Do you know driving
                                     </label>
                                     <div className="space-y-2">
                                         <div className="flex items-center">
                                             <input
                                                 id="drive-two-wheeler"
                                                 name="drivingKnowledge"
                                                 type="radio"
                                                 value="Two Wheeler"
                                                 checked={formData.drivingKnowledge === 'Two Wheeler'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="drive-two-wheeler" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 Two Wheeler
                                             </label>
                                         </div>
                                         <div className="flex items-center">
                                             <input
                                                 id="drive-four-wheeler"
                                                 name="drivingKnowledge"
                                                 type="radio"
                                                 value="Four Wheeler"
                                                 checked={formData.drivingKnowledge === 'Four Wheeler'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="drive-four-wheeler" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 Four Wheeler
                                             </label>
                                         </div>
                                         <div className="flex items-center">
                                             <input
                                                 id="drive-both"
                                                 name="drivingKnowledge"
                                                 type="radio"
                                                 value="Both"
                                                 checked={formData.drivingKnowledge === 'Both'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="drive-both" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 Both of Above
                                             </label>
                                         </div>
                                         <div className="flex items-center">
                                             <input
                                                 id="drive-none"
                                                 name="drivingKnowledge"
                                                 type="radio"
                                                 value="None"
                                                 checked={formData.drivingKnowledge === 'None'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="drive-none" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 None of Above
                                             </label>
                                         </div>
                                     </div>
                                 </div>
             </div>
                                 {/* Vehicle Owned */}
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-2">
                                         Do you have a vehicle
                                     </label>
                                     <div className="space-y-2 flex flex-col  lg:flex-row  justify-between">
                                         <div className="flex  items-center">
                                             <input
                                                 id="vehicle-two-wheeler"
                                                 name="vehicleOwned"
                                                 type="radio"
                                                 value="Two Wheeler"
                                                 checked={formData.vehicleOwned === 'Two Wheeler'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="vehicle-two-wheeler" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 Two Wheeler
                                             </label>
                                         </div>
                                         <div className="flex items-center">
                                             <input
                                                 id="vehicle-four-wheeler"
                                                 name="vehicleOwned"
                                                 type="radio"
                                                 value="Four Wheeler"
                                                 checked={formData.vehicleOwned === 'Four Wheeler'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="vehicle-four-wheeler" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 Four Wheeler
                                             </label>
                                         </div>
                                         <div className="flex items-center">
                                             <input
                                                 id="vehicle-both"
                                                 name="vehicleOwned"
                                                 type="radio"
                                                 value="Both"
                                                 checked={formData.vehicleOwned === 'Both'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="vehicle-both" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 Both of Above
                                             </label>
                                         </div>
                                         <div className="flex items-center">
                                             <input
                                                 id="vehicle-none"
                                                 name="vehicleOwned"
                                                 type="radio"
                                                 value="None"
                                                 checked={formData.vehicleOwned === 'None'}
                                                 onChange={handleChange}
                                                 className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                             />
                                             <label htmlFor="vehicle-none" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                 None of Above
                                             </label>
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
                                             className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                                             required
                                         />
                                     </div>
                                     <div className="ml-3 text-xs sm:text-sm">
                                         <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                                             I have read, understood and agree to the disclaimer
                                         </label>
                                     </div>
                                 </div>
                             </div>
 
                             {/* Submit Button */}
                             <div className="pt-4 sm:pt-6">
                                 <motion.button
                                     type="submit"
                                     className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                     whileHover={{ scale: 1.02 }}
                                     whileTap={{ scale: 0.98 }}
                                 >
                                     Submit Application
                                 </motion.button>
                             </div>
                         </form>
                     </CardContent>
                 </FeatureCard>
             </div>
         </div>
     );
 };
 
 export default JobRequireForm;
 " here are the following thing need to chnaged 

 1. the formdat field field name change to new fiel name "const [formData, setFormData] = useState({
    companyName: "company_name",
    companyType: "company_type",
    location: "location",
    address: "company_address",
    vacancyProfile: "profile_employee", 
    experienceRequired: "appx_exp",
    salaryPackage: "appx_sal",
    contactName: "contact_name",
    mobile: "contact_mobile",
    email: "email",
    agreeToTerms: false,
  });

apart from thisone more field will be there when in 'profile_employee' dropdown when he select  "Any Other You want to specify", that tiem on emore field will coem this one 
"other_job (input field type text)" 
"

2. add the validate " const validate = useCallback(() => {
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
  }, [formData]);" and in inpu t field "<div>
                                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                          Full Name *
                                      </label>
                                      <div className="relative">
                                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                              <User className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                                          </div>
                                          <input
                                              type="text"
                                              id="fullName"
                                              name="fullName"
                                              value={formData.fullName}
                                              onChange={handleChange}
                                              className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 border"
                                              required
                                          />
                                      </div>
                                  </div>" remov ete hicon "   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <User className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                              </div>'and add teh lassanme nad error lik this "<div>
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
                  </div>" and for hadnlesublit and useaxios nad tanstackquery and make as samestyle like this "const paymenttMutation = useMutation({
                    mutationFn: (payload) => {
                      return axios.post(
                        "https://southindiagarmentsassociation.com/public/api/create-duereconcilation",
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
                
                      await paymenttMutation.mutateAsync(payload);
                    console.log("Form submitted:", payload);
                  };" api for joofer si axios.post" https://southindiagarmentsassociation.com/public/api/create-job-required
" do the changed and giveme full updated ode JobRequireForm.jsx