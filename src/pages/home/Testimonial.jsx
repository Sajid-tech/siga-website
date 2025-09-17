import React from 'react'
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";


const testimonials = [
  {
    text: "SIGA has revolutionized our garment manufacturing operations, streamlining production and inventory management. Their platform keeps us productive across all locations.",
    image: "/1.jpg",
    name: "Priya Sharma",
    role: "Manufacturing Head",
  },
  {
    text: "Implementing SIGA's recommendations was smooth and effective. Their guidance on infrastructure upgrades helped us compete globally.",
    image: "/2.jpg",
    name: "Rajiv Patel",
    role: "Factory Owner",
  },
  {
    text: "The SIGA support team is exceptional, guiding us through government compliance processes and providing ongoing assistance with regulations.",
    image: "/1.jpg",
    name: "Ananya Reddy",
    role: "Compliance Officer",
  },
  {
    text: "SIGA's trade fairs have transformed our distribution network. The seamless connections with agents and retailers boosted our sales significantly.",
    image: "/2.jpg",
    name: "Vikram Joshi",
    role: "Distributor",
  },
  {
    text: "SIGA's market insights and government relations have helped us navigate policy changes while growing our garment business steadily.",
    image: "/1.jpg",
    name: "Divya Iyer",
    role: "Business Owner",
  },
  {
    text: "The annual garment fair organized by SIGA exceeded our expectations. We established valuable partnerships that improved our retail operations.",
    image: "/1.jpg",
    name: "Neha Gupta",
    role: "Retail Chain Manager",
  },
  {
    text: "Our small manufacturing unit flourished after joining SIGA. Their infrastructure support helped us upgrade to meet international standards.",
    image: "/2.jpg",
    name: "Arjun Desai",
    role: "Textile Producer",
  },
  {
    text: "SIGA delivered solutions that exceeded expectations, understanding our needs as garment exporters and enhancing our operations.",
    image: "/1.jpg",
    name: "Shreya Kapoor",
    role: "Export Manager",
  },
  {
    text: "Through SIGA's network, our brand presence and wholesale conversions improved dramatically, boosting our overall business performance.",
    image: "/2.jpg",
    name: "Rahul Mehta",
    role: "Brand Manager",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);



const Testimonial = () => {
  return (
   <section className="bg-gradient-to-bl from-indigo-300/25 via-transparent to-transparent  relative">
   
         <div className="mx-auto pt-20 max-w-[85rem] z-10 ">
           <div
           
             className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
           >
             <div className="flex justify-center">
               <div className="border py-1 px-4 rounded-lg">Testimonials</div>
             </div>
   
             <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
               What our Partner say
             </h2>
             <p className="text-center mt-5 opacity-75">
               See what our partners have to say about us.
             </p>
           </div>
   
           <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[540px] overflow-hidden">
             <TestimonialsColumn testimonials={firstColumn} duration={15} />
             <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
             <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
            

           </div>
         </div>
       </section>
  )
}

export default Testimonial