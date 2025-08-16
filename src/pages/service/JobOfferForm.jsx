import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { Briefcase, Building, MapPin, FileText, User, Mail, Phone } from 'lucide-react';

const JobOfferForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        companyType: '',
        location: '',
        address: '',
        vacancyProfile: '',
        experienceRequired: '',
        salaryPackage: '',
        contactName: '',
        mobile: '',
        email: '',
        agreeToTerms: false
    });

    const companyTypes = [
        'Manufacturing',
        'Logistics',
        'Trade',
        'Services',
        'Accountancy',
        'IT Sector',
        'Hospitality Services'
    ];

    const vacancyProfiles = [
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

    const salaryPackages = [
        'Below 20000',
        '20000 to 25000',
        '25000 to 35000',
        '35000 to 50000',
        'Above 50000'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const CardHeading = ({ icon: Icon, title, description }) => (
        <div className="px-2">
            <span className="text-muted-foreground flex items-center gap-2">
                <Icon className="size-4" />
                {title}
            </span>
            <p className="mt-2 text-xl sm:text-2xl font-semibold">{description}</p>
        </div>
    );

    const FeatureCard = ({ children, className }) => (
        <Card className={cn('group relative rounded-none shadow-zinc-950/5', className)}>
            <CardDecorator />
            {children}
        </Card>
    );

    const CardDecorator = () => (
        <>
            <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
            <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
            <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
            <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
        </>
    );

    return (
        <div className="relative w-full bg-white overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <motion.div 
                    className="text-center mb-8 sm:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Post a <span className="relative inline-block">
                            <span className="relative z-10">Job Opening</span>
                            <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300/70 -rotate-1 -z-0"></span>
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Fill out the form below to post your job requirements
                    </p>
                </motion.div>

                <FeatureCard>
                    <CardHeader className="pb-2 sm:pb-4">
                        <CardHeading
                            icon={Briefcase}
                            title="Employer Details"
                            description="Company/Firm Information"
                        />
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-2 sm:p-4">
                            {/* Company Name */}
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base py-2 border"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Company Type */}
                            <div>
                                <label htmlFor="companyType" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company/Firm Type
                                </label>
                                <select
                                    id="companyType"
                                    name="companyType"
                                    value={formData.companyType}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm sm:text-base focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 border"
                                    required
                                >
                                    <option value="">Select company type</option>
                                    {companyTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location of Company/Firm
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base py-2 border"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company/Firm Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base border p-2"
                                    required
                                />
                            </div>

                            {/* Vacancy Profile */}
                            <div>
                                <label htmlFor="vacancyProfile" className="block text-sm font-medium text-gray-700 mb-1">
                                    Vacancy Profile
                                </label>
                                <select
                                    id="vacancyProfile"
                                    name="vacancyProfile"
                                    value={formData.vacancyProfile}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm sm:text-base focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 border"
                                    required
                                >
                                    <option value="">Select vacancy profile</option>
                                    {vacancyProfiles.map((profile) => (
                                        <option key={profile} value={profile}>{profile}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Experience Required */}
                            <div>
                                <label htmlFor="experienceRequired" className="block text-sm font-medium text-gray-700 mb-1">
                                    Experience Required (in Years)
                                </label>
                                <input
                                    type="number"
                                    id="experienceRequired"
                                    name="experienceRequired"
                                    min="0"
                                    value={formData.experienceRequired}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base py-2 px-3 border"
                                    required
                                />
                            </div>

                            {/* Salary Package */}
                            <div>
                                <label htmlFor="salaryPackage" className="block text-sm font-medium text-gray-700 mb-1">
                                    Approx Salary Package (per Month)
                                </label>
                                <select
                                    id="salaryPackage"
                                    name="salaryPackage"
                                    value={formData.salaryPackage}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm sm:text-base focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 border"
                                    required
                                >
                                    <option value="">Select salary package</option>
                                    {salaryPackages.map((pkg) => (
                                        <option key={pkg} value={pkg}>{pkg}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Contact Information */}
                            <div className="pt-3 sm:pt-4 border-t border-gray-200">
                                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                                    <User className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-2" />
                                    Contact Information
                                </h3>

                                {/* Contact Name */}
                                <div className="mb-3 sm:mb-4">
                                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="contactName"
                                            name="contactName"
                                            value={formData.contactName}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div className="mb-3 sm:mb-4">
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile
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
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
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
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base py-2 border"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Terms Agreement */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                                        I have read, understood and agree to the disclaimer
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 sm:pt-6">
                                <motion.button
                                    type="submit"
                                    className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Submit Job Opening
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