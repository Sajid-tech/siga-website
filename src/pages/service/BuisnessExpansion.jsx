import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { User, Phone, Mail, MapPin, Package, Tag, Briefcase, Map } from 'lucide-react';


const BusinessExpansion = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [productsForm, setProductsForm] = useState({
        fullName: '',
        contactNo: '',
        email: '',
        address: '',
        product: '',
        aboutYou: '',
        state: '',
        area: '',
        priceCategory: '',
        offer: ''
    });

    const [distributorForm, setDistributorForm] = useState({
        fullName: '',
        contactNo: '',
        email: '',
        address: '',
        product: '',
        brand: '',
        aboutYou: '',
        lookingFor: '',
        state: '',
        area: '',
        priceCategory: '',
        offer: ''
    });

    const aboutYouOptions = ['Agent', 'Distributor', 'Manufacturer', 'Retailer'];
    const lookingForOptions = ['Agent', 'Distributor', 'Retailer'];

    const handleProductsChange = (e) => {
        const { name, value } = e.target;
        setProductsForm(prev => ({ ...prev, [name]: value }));
    };

    const handleDistributorChange = (e) => {
        const { name, value } = e.target;
        setDistributorForm(prev => ({ ...prev, [name]: value }));
    };

    const handleProductsSubmit = (e) => {
        e.preventDefault();
        console.log('Products Form submitted:', productsForm);
    };

    const handleDistributorSubmit = (e) => {
        e.preventDefault();
        console.log('Distributor Form submitted:', distributorForm);
    };

    const CardHeading = useCallback(({ icon: Icon, title, description }) => (
        <div className="px-2">
            <span className="text-muted-foreground flex items-center gap-2">
                <Icon className="size-4" />
                {title}
            </span>
            <p className="mt-2 sm:mt-4 text-xl sm:text-2xl font-semibold">{description}</p>
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
        <div className="relative w-full py-4 sm:py-8 bg-white overflow-hidden">
            <div className="relative z-10 max-w-[85rem] mx-auto ">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                        SIGA <Highlight>Business Expansion</Highlight>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                        SIGA Members are given opportunity to find buyer or sellers. Please fill the below form and let TEAM SIGA work for you
                    </p>
                </motion.div>

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
      onClick={() => setActiveTab('products')}
      className={`flex-1 whitespace-nowrap py-3 px-4 text-center font-medium text-sm transition-all duration-200 ${
        activeTab === 'products' 
          ? 'border-b-2 border-yellow-500 text-yellow-900 bg-yellow-50 shadow-sm' 
          : 'border-b border-gray-200 text-gray-900 hover:text-gray-700 bg-gray-50'
      }`}
    >
      Looking Products
    </button>
    <button
      onClick={() => setActiveTab('distributors')}
      className={`flex-1 whitespace-nowrap py-3 px-4 text-center font-medium text-sm transition-all duration-200 ${
        activeTab === 'distributors' 
          ? 'border-b-2 border-yellow-500 text-yellow-900 bg-yellow-50 shadow-sm' 
          : 'border-b border-gray-200 text-gray-900 hover:text-gray-700 bg-gray-50'
      }`}
    >
      Looking Distributor/Agent/Retailer
    </button>
  </nav>
</div>
                        {/* Tabs */}
                        {/* <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab('products')}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-mediumtext-sm ${activeTab === 'products' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    Looking Products
                                </button>
                                <button
                                    onClick={() => setActiveTab('distributors')}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'distributors' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    Looking Distributor/Agent/Retailer
                                </button>
                            </nav>
                        </div> */}

                        {/* Looking Products Form */}
                        {activeTab === 'products' && (
                            <form onSubmit={handleProductsSubmit} className="space-y-4 sm:space-y-6 p-2 sm:p-4">
                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={productsForm.fullName}
                                            onChange={handleProductsChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Contact No */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact No *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="contactNo"
                                            value={productsForm.contactNo}
                                            onChange={handleProductsChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Id *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={productsForm.email}
                                            onChange={handleProductsChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>
                                </div>
                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            name="address"
                                            value={productsForm.address}
                                            onChange={handleProductsChange}
                                            rows={3}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm border p-2"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Product */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="product"
                                            value={productsForm.product}
                                            onChange={handleProductsChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* About You */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        About You *
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                                        {aboutYouOptions.map(option => (
                                            <div key={option} className="flex items-center">
                                                <input
                                                    id={`products-about-${option}`}
                                                    name="aboutYou"
                                                    type="radio"
                                                    value={option}
                                                    checked={productsForm.aboutYou === option}
                                                    onChange={handleProductsChange}
                                                    className="focus:ring-yellow-500 h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 border-gray-300"
                                                    required
                                                />
                                                <label htmlFor={`products-about-${option}`} className="ml-2 sm:ml-3 block text-sm text-gray-700">
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {/* State */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        State *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Map className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="state"
                                            value={productsForm.state}
                                            onChange={handleProductsChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Area/Region */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Area/Region *
                                    </label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={productsForm.area}
                                        onChange={handleProductsChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 px-3 border"
                                        required
                                    />
                                </div>

                                {/* Price Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price Category *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="priceCategory"
                                            value={productsForm.priceCategory}
                                            onChange={handleProductsChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>
                                </div>
                                {/* What your Offer */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        What your Offer *
                                    </label>
                                    <textarea
                                        name="offer"
                                        value={productsForm.offer}
                                        onChange={handleProductsChange}
                                        rows={3}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm border p-2"
                                        required
                                    />
                                </div>
                          
                                {/* Submit Button */}
                                <div className="pt-2 sm:pt-4">
                                    <motion.button
                                        type="submit"
                                        className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Submit Looking Products Request
                                    </motion.button>
                                </div>
                            </form>
                        )}

                        {/* Looking Distributor/Agent/Retailer Form */}
                        {activeTab === 'distributors' && (
                            <form onSubmit={handleDistributorSubmit} className="space-y-4 sm:space-y-6 p-2 sm:p-4">
                                           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={distributorForm.fullName}
                                            onChange={handleDistributorChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Contact No */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact No *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="contactNo"
                                            value={distributorForm.contactNo}
                                            onChange={handleDistributorChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Id *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={distributorForm.email}
                                            onChange={handleDistributorChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            name="address"
                                            value={distributorForm.address}
                                            onChange={handleDistributorChange}
                                            rows={3}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm border p-2"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Product */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="product"
                                            value={distributorForm.product}
                                            onChange={handleDistributorChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Brand *
                                    </label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={distributorForm.brand}
                                        onChange={handleDistributorChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 px-3 border"
                                        required
                                    />
                                </div>

                                {/* About You */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        About You *
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                                        {aboutYouOptions.map(option => (
                                            <div key={option} className="flex items-center">
                                                <input
                                                    id={`distributor-about-${option}`}
                                                    name="aboutYou"
                                                    type="radio"
                                                    value={option}
                                                    checked={distributorForm.aboutYou === option}
                                                    onChange={handleDistributorChange}
                                                    className="focus:ring-yellow-500 h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 border-gray-300"
                                                    required
                                                />
                                                <label htmlFor={`distributor-about-${option}`} className="ml-2 sm:ml-3 block text-sm text-gray-700">
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Looking For */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Looking For *
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                                        {lookingForOptions.map(option => (
                                            <div key={option} className="flex items-center">
                                                <input
                                                    id={`looking-for-${option}`}
                                                    name="lookingFor"
                                                    type="radio"
                                                    value={option}
                                                    checked={distributorForm.lookingFor === option}
                                                    onChange={handleDistributorChange}
                                                    className="focus:ring-yellow-500 h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 border-gray-300"
                                                    required
                                                />
                                                <label htmlFor={`looking-for-${option}`} className="ml-2 sm:ml-3 blocktext-sm text-gray-700">
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {/* State */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        State *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Map className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="state"
                                            value={distributorForm.state}
                                            onChange={handleDistributorChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Area/Region */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Area/Region *
                                    </label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={distributorForm.area}
                                        onChange={handleDistributorChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 px-3 border"
                                        required
                                    />
                                </div>

                                {/* Price Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price Category *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="priceCategory"
                                            value={distributorForm.priceCategory}
                                            onChange={handleDistributorChange}
                                            className="pl-9 sm:pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm py-2 border"
                                            required
                                        />
                                    </div>
                                </div>
                                </div>

                                {/* What your Offer */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        What your Offer *
                                    </label>
                                    <textarea
                                        name="offer"
                                        value={distributorForm.offer}
                                        onChange={handleDistributorChange}
                                        rows={2}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-sm border p-2"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2 sm:pt-4">
                                    <motion.button
                                        type="submit"
                                        className="w-full flex justify-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Submit Distributor Request
                                    </motion.button>
                                </div>
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