import { Earth, Mail, MapPin, Phone } from "lucide-react";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import useNumericInput from "../../hooks/useNumericInput";
import { Card, CardContent, CardHeader } from "@/components/ui/event-card";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loader, setLoader] = useState(false);
  const [contactData, setContactData] = useState({
    fullname: "",
    mobile_no: "",
    email_id: "",
    description: "",
  });
  const keyDown = useNumericInput();
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "mobile_no" && value && !/^\d*$/.test(value)) return;

    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!contactData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }
    if (!contactData.email_id.trim()) {
      newErrors.email_id = "Email is required";
    }
    if (!contactData.mobile_no.trim()) {
      newErrors.mobile_no = "Mobile number is required";
    }
    return newErrors;
  }, [contactData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('submit contact form successfully');
  }, [validate]);

  const contactdata = [
    {
      title: "Mail Us",
      icon: <Mail className="w-5 h-5" />,
      entries: [
        { icon: <Mail size={14} />, text: 'sigabng@yahoo.com' || "N/A" },
        { icon: <Earth size={14} />, text: "sigabengluru@gmail.com" },
      ],
    },
    {
      title: "Contact",
      icon: <Phone className="w-5 h-5" />,
      entries: [
        { icon: <Phone size={14} />, text: '(+91) 96326 48525' || "N/A" },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[14px] h-[14px] text-gray-600 shrink-0"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.735 5.601 2.126 8.049L0 32l8.265-2.086A15.902 15.902 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.372 0-4.683-.619-6.72-1.792l-.48-.278-4.897 1.237 1.294-4.768-.313-.491a13.245 13.245 0 01-2.06-7.041c0-7.323 5.956-13.28 13.279-13.28 7.324 0 13.28 5.957 13.28 13.28 0 7.323-5.956 13.28-13.28 13.28zM23.61 19.373c-.327-.164-1.934-.955-2.235-1.065-.3-.11-.52-.164-.74.164s-.847 1.065-1.04 1.287c-.191.218-.382.246-.709.082-.327-.163-1.383-.509-2.637-1.622-.974-.867-1.633-1.934-1.825-2.26-.191-.327-.021-.503.145-.667.149-.148.327-.382.491-.573.164-.191.218-.327.327-.546.11-.218.055-.409-.027-.573-.082-.163-.74-1.788-1.015-2.456-.268-.644-.541-.558-.74-.568-.191-.008-.409-.01-.627-.01-.218 0-.573.082-.873.409-.3.327-1.144 1.117-1.144 2.726 0 1.609 1.172 3.164 1.337 3.383.164.218 2.309 3.523 5.6 4.942.783.337 1.393.538 1.869.686.784.25 1.496.215 2.057.13.627-.094 1.934-.79 2.209-1.552.273-.76.273-1.409.19-1.552-.082-.145-.3-.218-.627-.382z" />
            </svg>
          ),
          text: '(+91) 98450 03059' || "N/A",
        },
      ],
    },
    {
      title: "Address",
      icon: <MapPin className="w-5 h-5" />,
      entries: [
        {
          icon: <MapPin size={14} />,
          text: 'No. 308, 1st Floor, Auto Tower #9, J.C. Road, Bangalore-560002.' || "No address provided",
          multiline: true,
        },
      ],
    },
  ];

  const CardHeading = useCallback(({ icon: Icon, title, description }) => (
    <div className="px-2">
      <span className="text-muted-foreground flex items-center gap-2">
        <Icon className="size-4" />
        {title}
      </span>
      <p className="mt-4 text-2xl font-semibold">{description}</p>
    </div>
  ), []);

  const CardDecorator = useCallback(() => (
    <>
      <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
      <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
      <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
      <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </>
  ), []);


  const FeatureCard = useCallback(({ children, className }) => (
    <Card className={cn('group relative rounded-none shadow-zinc-950/5', className)}>
      <CardDecorator />
      {children}
    </Card>
  ), [CardDecorator]);

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
            SIGA <Highlight>Contact Us</Highlight>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please select a topic below related to your inquiry. If you don't find
            what you need, fill out our contact form.
          </p>
        </motion.div>

        {/* Contact Info and Form Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Contact Info Cards - Takes 2/3 space on desktop */}
          <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactdata.map((item, idx) => (
              <FeatureCard key={idx} className="flex flex-col">
                <CardHeader className="pb-3 flex-shrink-0">
                  <CardHeading
                    icon={item.icon.type}
                    title={item.title}
                    description={item.title === "Mail Us" ? "Email us" : item.title === "Contact" ? "Call us" : "Visit us"}
                  />
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="space-y-2">
                      {item.entries.map((entry, eIdx) => (
                        <div 
                          key={eIdx} 
                          className={`flex ${entry.multiline ? 'items-start' : 'items-center'} gap-2 text-sm text-gray-600`}
                        >
                          <span className="text-gray-500">{entry.icon}</span>
                          <span>{entry.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </FeatureCard>
            ))}
          </div>

          {/* Contact Form - Takes 1/3 space on desktop */}
          <div className="md:col-span-1">
            <FeatureCard className="h-full">
              <CardHeader className="pb-3">
                <CardHeading
                  icon={Mail}
                  title="Contact Form"
                  description="Send us a message"
                />
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      maxLength={50}
                      value={contactData.fullname}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                        errors.fullname
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      placeholder="Full Name"
                    />
                    {errors.fullname && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      id="email_id"
                      name="email_id"
                      maxLength={80}
                      value={contactData.email_id}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                        errors.email_id
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      placeholder="Email"
                    />
                    {errors.email_id && (
                      <p className="text-red-500 text-xs mt-1">{errors.email_id}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      id="mobile_no"
                      name="mobile_no"
                      minLength={10}
                      maxLength={10}
                      onKeyDown={keyDown}
                      value={contactData.mobile_no}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                        errors.mobile_no
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      placeholder="Phone"
                    />
                    {errors.mobile_no && (
                      <p className="text-red-500 text-xs mt-1">{errors.mobile_no}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      id="description"
                      name="description"
                      value={contactData.description}
                      onChange={handleChange}
                      rows="4"
                      maxLength={200}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      placeholder="Your message..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                  >
                    {loader ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </CardContent>
            </FeatureCard>
          </div>
          <div className="">
          <FeatureCard>
          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <MapPin className="w-6 h-6 text-blue-600 mr-2" />
            Our Location
          </motion.h2>
          
       
            <div className="h-[400px] relative">
              {!mapLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[5px]" />
              )}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1951074580197!2d77.58052467490775!3d12.959363715146788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15e7142f51f1%3A0x3732b4ec53d512a4!2sSouth%20India%20Garment%20Association!5e0!3m2!1sen!2sin!4v1755493485669!5m2!1sen!2sin"
                referrerPolicy="no-referrer-when-downgrade"
                className={`w-full h-full border-0 rounded-[5px] transition-opacity duration-500 ${
                  mapLoaded ? "opacity-100" : "opacity-0"
                }`}
                allowFullScreen
                loading="lazy"
                onLoad={() => setMapLoaded(true)}
              />
            </div>
          </FeatureCard>
        </div>
        </div>

        {/* Full Width Map Section */}
        
      </div>
    </div>
  );
};

const Highlight = ({ children, className }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-300/70 -rotate-1 -z-0"></span>
    </span>
  );
};

export default Contact;