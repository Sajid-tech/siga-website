import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { Building, MapPin, User, Phone, Mail, FileText, Calendar, DollarSign } from 'lucide-react';

const PaymentMediation = () => {
    const [formData, setFormData] = useState({
        supplierCompanyName: '',
        supplierAddress: '',
        supplierContactName: '',
        supplierMobile: '',
        supplierEmail: '',
        buyerCompanyName: '',
        buyerAddress: '',
        buyerContactName: '',
        buyerMobile: '',
        buyerEmail: '',
        dueAmount: '',
        pendingFrom: '',
        ledgerFile: null,
        authorizationLetter: null,
        agreeToTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
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
            <p className="mt-2 sm:mt-4 text-xl sm:text-2xl font-semibold">{description}</p>
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
        <div className="relative w-full py-4 sm:py-8 bg-white overflow-hidden">
            <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                        SIGA <Highlight>Payment Mediation</Highlight>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                        SIGA assist members to resolve the conflict/disputes with their buyers/purchaser for recovery of pending payments.
                    </p>
                </motion.div>

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
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 p-3 sm:p-4">
                            {/* Supplier's Details Section */}
                            <div className="space-y-3 sm:space-y-4">
                                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
                                    Supplier's Details
                                </h3>

                                {/* Company Name */}
                                <div>
                                    <label htmlFor="supplierCompanyName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Company/Firm Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Building className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="supplierCompanyName"
                                            name="supplierCompanyName"
                                            value={formData.supplierCompanyName}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label htmlFor="supplierAddress" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Address *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            id="supplierAddress"
                                            name="supplierAddress"
                                            rows={2}
                                            value={formData.supplierAddress}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm border p-1 sm:p-2"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Contact Name */}
                                <div>
                                    <label htmlFor="supplierContactName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Contact Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="supplierContactName"
                                            name="supplierContactName"
                                            value={formData.supplierContactName}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label htmlFor="supplierMobile" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Mobile No *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            id="supplierMobile"
                                            name="supplierMobile"
                                            value={formData.supplierMobile}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="supplierEmail" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Email Id *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="supplierEmail"
                                            name="supplierEmail"
                                            value={formData.supplierEmail}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Buyer's Details Section */}
                            <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
                                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
                                    Buyer's Details
                                </h3>

                                {/* Company Name */}
                                <div>
                                    <label htmlFor="buyerCompanyName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Company/Firm Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Building className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="buyerCompanyName"
                                            name="buyerCompanyName"
                                            value={formData.buyerCompanyName}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label htmlFor="buyerAddress" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Address *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            id="buyerAddress"
                                            name="buyerAddress"
                                            rows={2}
                                            value={formData.buyerAddress}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm border p-1 sm:p-2"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Contact Name */}
                                <div>
                                    <label htmlFor="buyerContactName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Contact Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="buyerContactName"
                                            name="buyerContactName"
                                            value={formData.buyerContactName}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label htmlFor="buyerMobile" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Mobile No *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            id="buyerMobile"
                                            name="buyerMobile"
                                            value={formData.buyerMobile}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="buyerEmail" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Email Id *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="buyerEmail"
                                            name="buyerEmail"
                                            value={formData.buyerEmail}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Due Reconciliation Section */}
                            <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
                                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
                                    Due Reconciliation
                                </h3>

                                {/* Due Amount */}
                                <div>
                                    <label htmlFor="dueAmount" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Due Amount *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="dueAmount"
                                            name="dueAmount"
                                            value={formData.dueAmount}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Pending From */}
                                <div>
                                    <label htmlFor="pendingFrom" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Pending From *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            id="pendingFrom"
                                            name="pendingFrom"
                                            value={formData.pendingFrom}
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-xs sm:text-sm py-1 sm:py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Ledger File */}
                                <div>
                                    <label htmlFor="ledgerFile" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Ledger (Minimum 3 Years) *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="file"
                                            id="ledgerFile"
                                            name="ledgerFile"
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Authorization Letter */}
                                <div>
                                    <label htmlFor="authorizationLetter" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Authorisation Letter *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="file"
                                            id="authorizationLetter"
                                            name="authorizationLetter"
                                            onChange={handleChange}
                                            className="pl-9 sm:pl-10 block w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                                            required
                                        />
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
                                            className="focus:ring-yellow-500 h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="ml-2 sm:ml-3 text-xs sm:text-sm">
                                        <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                                            I have read, understood and agree to the Terms & Conditions
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 sm:pt-6">
                                <motion.button
                                    type="submit"
                                    className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Submit Payment Mediation Request
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
            <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300/70 -rotate-1 -z-0"></span>
        </span>
    );
};