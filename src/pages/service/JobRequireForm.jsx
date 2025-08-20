import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { User, Mail, Phone, Home, Briefcase, FileText, Car, Calendar } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const JobRequireForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        father_name: '',
        person_email: '',
        person_mobile: '',
        person_education: '',
        house_address: '',
        residing_years: '',
        re_locate: '',
        last_employer: '',
        contact_person: '',
        designation: '',
        phone_number: '',
        exp_address: '',
        last_salary: '',
        exp_salary: '',
        lose_job: '',
        dependants: '',
        person: '',
        jobProfiles: [],
        other_job: '',
        have_licence: '',
        know_driving: '',
        have_vehicle: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});
    const [loader, setLoader] = useState(false);

    const validate = useCallback(() => {
        const newErrors = {};
        if (!formData.full_name.trim()) {
            newErrors.full_name = "Full name is required";
        }
        if (!formData.father_name.trim()) {
            newErrors.father_name = "Father name is required";
        }
        if (!formData.person_email.trim()) {
            newErrors.person_email = "Email is required";
        }
        if (!formData.person_mobile.trim()) {
            newErrors.person_mobile = "Mobile number is required";
        }
        if (!formData.person_education.trim()) {
            newErrors.person_education = "Education is required";
        }
        if (!formData.house_address.trim()) {
            newErrors.house_address = "House address is required";
        }
        if (!formData.residing_years.trim()) {
            newErrors.residing_years = "Current city is required";
        }
        if (!formData.re_locate.trim()) {
            newErrors.re_locate = "Relocation preference is required";
        }
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "Terms & Condition Required";
        }

        return newErrors;
    }, [formData]);

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
            if (name === 'jobProfiles') {
                setFormData(prev => {
                    const newProfiles = checked 
                        ? [...prev.jobProfiles, value]
                        : prev.jobProfiles.filter(item => item !== value);
                    return { ...prev, jobProfiles: newProfiles };
                });
            } else {
                setFormData(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const jobRequireMutation = useMutation({
        mutationFn: (payload) => {
            return axios.post(
                "https://southindiagarmentsassociation.com/public/api/create-job-required",
                payload,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
        },
        onSuccess: (response) => {
            console.log("Job require form submitted successfully", response);

            const res = response.data;

            if (res.code === "201") {
                setFormData({
                    full_name: '',
                    father_name: '',
                    person_email: '',
                    person_mobile: '',
                    person_education: '',
                    house_address: '',
                    residing_years: '',
                    re_locate: '',
                    last_employer: '',
                    contact_person: '',
                    designation: '',
                    phone_number: '',
                    exp_address: '',
                    last_salary: '',
                    exp_salary: '',
                    lose_job: '',
                    dependants: '',
                    person: '',
                    jobProfiles: [],
                    other_job: '',
                    have_licence: '',
                    know_driving: '',
                    have_vehicle: '',
                    agreeToTerms: false
                });
                toast.success(res.msg || "Job application submitted successfully! ✅");
            } else if (res.code === "400") {
                toast.error(res.heading || "Something went wrong ❌");
            } else {
                toast.error(res.msg || "Unknown error occurred ❌");
            }
            setLoader(false);
        },
        onError: (error) => {
            console.error("Error submitting form:", error);
            toast.error(error.response?.data?.message || "Failed to submit job application");
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
        payload.append("full_name", formData.full_name);
        payload.append("father_name", formData.father_name);
        payload.append("person_email", formData.person_email);
        payload.append("person_mobile", formData.person_mobile);
        payload.append("person_education", formData.person_education);
        payload.append("house_address", formData.house_address);
        payload.append("residing_years", formData.residing_years);
        payload.append("re_locate", formData.re_locate);
        payload.append("last_employer", formData.last_employer);
        payload.append("contact_person", formData.contact_person);
        payload.append("designation", formData.designation);
        payload.append("phone_number", formData.phone_number);
        payload.append("exp_address", formData.exp_address);
        payload.append("last_salary", formData.last_salary);
        payload.append("exp_salary", formData.exp_salary);
        payload.append("lose_job", formData.lose_job);
        payload.append("dependants", formData.dependants);
        payload.append("person", formData.person);
        payload.append("jobProfiles", formData.jobProfiles.join(','));
        payload.append("other_job", formData.other_job);
        payload.append("have_licence", formData.have_licence);
        payload.append("know_driving", formData.know_driving);
        payload.append("have_vehicle", formData.have_vehicle);

        await jobRequireMutation.mutateAsync(payload);
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
                                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm sm:text-base py-2 px-3 border
                                            ${
                                                errors.full_name
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-purple-500 focus:ring-purple-500"
                                            }`}
                                    />
                                    {errors.full_name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.full_name}
                                        </p>
                                    )}
                                </div>

                                {/* Father Name */}
                                <div>
                                    <label htmlFor="father_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Father Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="father_name"
                                        name="father_name"
                                        value={formData.father_name}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm sm:text-base py-2 px-3 border
                                            ${
                                                errors.father_name
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-purple-500 focus:ring-purple-500"
                                            }`}
                                    />
                                    {errors.father_name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.father_name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="person_email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="person_email"
                                        name="person_email"
                                        value={formData.person_email}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm sm:text-base py-2 px-3 border
                                            ${
                                                errors.person_email
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-purple-500 focus:ring-purple-500"
                                            }`}
                                    />
                                    {errors.person_email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.person_email}
                                        </p>
                                    )}
                                </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Mobile */}
                                <div>
                                    <label htmlFor="person_mobile" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile *
                                    </label>
                                    <input
                                        type="tel"
                                        id="person_mobile"
                                        name="person_mobile"
                                        value={formData.person_mobile}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm sm:text-base py-2 px-3 border
                                            ${
                                                errors.person_mobile
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-purple-500 focus:ring-purple-500"
                                            }`}
                                    />
                                    {errors.person_mobile && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.person_mobile}
                                        </p>
                                    )}
                                </div>

                                {/* Education */}
                                <div>
                                    <label htmlFor="person_education" className="block text-sm font-medium text-gray-700 mb-1">
                                        Education *
                                    </label>
                                    <input
                                        type="text"
                                        id="person_education"
                                        name="person_education"
                                        value={formData.person_education}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm sm:text-base py-2 px-3 border
                                            ${
                                                errors.person_education
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-purple-500 focus:ring-purple-500"
                                            }`}
                                    />
                                    {errors.person_education && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.person_education}
                                        </p>
                                    )}
                                </div>
                                </div>
                                {/* House Address */}
                                <div>
                                    <label htmlFor="house_address" className="block text-sm font-medium text-gray-700 mb-1">
                                        House Address *
                                    </label>
                                    <textarea
                                        id="house_address"
                                        name="house_address"
                                        rows={3}
                                        value={formData.house_address}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm sm:text-base border p-2
                                            ${
                                                errors.house_address
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-purple-500 focus:ring-purple-500"
                                            }`}
                                    />
                                    {errors.house_address && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.house_address}
                                        </p>
                                    )}
                                </div>

                                {/* Current City */}
                                <div>
                                    <label htmlFor="residing_years" className="block text-sm font-medium text-gray-700 mb-1">
                                        Current City *
                                    </label>
                                    <input
                                        type="text"
                                        id="residing_years"
                                        name="residing_years"
                                        value={formData.residing_years}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 text-sm sm:text-base py-2 px-3 border
                                            ${
                                                errors.residing_years
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:border-purple-500 focus:ring-purple-500"
                                            }`}
                                    />
                                    {errors.residing_years && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.residing_years}
                                        </p>
                                    )}
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
                                                name="re_locate"
                                                type="radio"
                                                value="Yes"
                                                checked={formData.re_locate === 'Yes'}
                                                onChange={handleChange}
                                                className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                            />
                                            <label htmlFor="relocate-yes" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                Yes I am ready to re-locate
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="relocate-no"
                                                name="re_locate"
                                                type="radio"
                                                value="No"
                                                checked={formData.re_locate === 'No'}
                                                onChange={handleChange}
                                                className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300"
                                            />
                                            <label htmlFor="relocate-no" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-700">
                                                No, I am not ready to re-locate
                                            </label>
                                        </div>
                                    </div>
                                    {errors.re_locate && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.re_locate}
                                        </p>
                                    )}
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
                                    <label htmlFor="last_employer" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Employed by Company/Firm
                                    </label>
                                    <input
                                        type="text"
                                        id="last_employer"
                                        name="last_employer"
                                        value={formData.last_employer}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                    />
                                </div>

                                {/* Contact Person */}
                                <div>
                                    <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Person
                                    </label>
                                    <input
                                        type="text"
                                        id="contact_person"
                                        name="contact_person"
                                        value={formData.contact_person}
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
                                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone_number"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                    />
                                </div>
                    </div>
                                {/* Company Address */}
                                <div>
                                    <label htmlFor="exp_address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <textarea
                                        id="exp_address"
                                        name="exp_address"
                                        rows={3}
                                        value={formData.exp_address}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base border p-2"
                                    />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {/* Last Salary */}
                                <div>
                                    <label htmlFor="last_salary" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Salary Drawn (per Month)
                                    </label>
                                    <input
                                        type="text"
                                        id="last_salary"
                                        name="last_salary"
                                        value={formData.last_salary}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                    />
                                </div>

                                {/* Expected Salary */}
                                <div>
                                    <label htmlFor="exp_salary" className="block text-sm font-medium text-gray-700 mb-1">
                                        Expected Salary (per Month)
                                    </label>
                                    <input
                                        type="text"
                                        id="exp_salary"
                                        name="exp_salary"
                                        value={formData.exp_salary}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                    />
                                </div>

                                {/* Job Lost Date */}
                                <div>
                                    <label htmlFor="lose_job" className="block text-sm font-medium text-gray-700 mb-1">
                                        When did you lose your job
                                    </label>
                                    <input
                                        type="date"
                                        id="lose_job"
                                        name="lose_job"
                                        value={formData.lose_job}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                    />
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
                                    <label htmlFor="dependants" className="block text-sm font-medium text-gray-700 mb-1">
                                        No of Dependants in Family
                                    </label>
                                    <input
                                        type="number"
                                        id="dependants"
                                        name="dependants"
                                        min="0"
                                        value={formData.dependants}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                    />
                                </div>

                                {/* Pandemic Loss */}
                                <div>
                                    <label htmlFor="person" className="block text-sm font-medium text-gray-700 mb-1">
                                        Have you lost any person in this pandemic – Relationship with the deceased
                                    </label>
                                    <textarea
                                        id="person"
                                        name="person"
                                        rows={3}
                                        value={formData.person}
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
                                                    name="jobProfiles"
                                                    type="checkbox"
                                                    value={profile}
                                                    checked={formData.jobProfiles.includes(profile)}
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

                                {/* Other Job Field */}
                                {formData.jobProfiles.includes('Other') && (
                                    <div>
                                        <label htmlFor="other_job" className="block text-sm font-medium text-gray-700 mb-1">
                                            Specify Other Job Profile
                                        </label>
                                        <input
                                            type="text"
                                            id="other_job"
                                            name="other_job"
                                            value={formData.other_job}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base py-2 px-3 border"
                                            placeholder="Specify other job profile"
                                        />
                                    </div>
                                )}
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
                                                name="have_licence"
                                                type="radio"
                                                value="Two Wheeler"
                                                checked={formData.have_licence === 'Two Wheeler'}
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
                                                name="have_licence"
                                                type="radio"
                                                value="LMV"
                                                checked={formData.have_licence === 'LMV'}
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
                                                name="have_licence"
                                                type="radio"
                                                value="HMV"
                                                checked={formData.have_licence === 'HMV'}
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
                                                name="have_licence"
                                                type="radio"
                                                value="No License"
                                                checked={formData.have_licence === 'No License'}
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
                                                name="know_driving"
                                                type="radio"
                                                value="Two Wheeler"
                                                checked={formData.know_driving === 'Two Wheeler'}
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
                                                name="know_driving"
                                                type="radio"
                                                value="Four Wheeler"
                                                checked={formData.know_driving === 'Four Wheeler'}
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
                                                name="know_driving"
                                                type="radio"
                                                value="Both"
                                                checked={formData.know_driving === 'Both'}
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
                                                name="know_driving"
                                                type="radio"
                                                value="None"
                                                checked={formData.know_driving === 'None'}
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
                                                name="have_vehicle"
                                                type="radio"
                                                value="Two Wheeler"
                                                checked={formData.have_vehicle === 'Two Wheeler'}
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
                                                name="have_vehicle"
                                                type="radio"
                                                value="Four Wheeler"
                                                checked={formData.have_vehicle === 'Four Wheeler'}
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
                                                name="have_vehicle"
                                                type="radio"
                                                value="Both"
                                                checked={formData.have_vehicle === 'Both'}
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
                                                name="have_vehicle"
                                                type="radio"
                                                value="None"
                                                checked={formData.have_vehicle === 'None'}
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
                                            className={`h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-300 
                                                focus:ring-0 
                                                ${errors.agreeToTerms ? "text-red-600 " : "text-purple-600"}`}
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