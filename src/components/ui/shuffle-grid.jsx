

import { Waves } from "@/components/ui/waves-background";
import { cn } from "@/lib/utils";
import CircularTestimonials from "./circular-testimonial";
import { Button } from "./button";
import { Link, useNavigate } from "react-router-dom";

const testimonials = [
  {
    quote:
      "Meeting with Honarable Prime Minister Narendara Modi",
 
    src:
      "./efforts/1.jpg",
  },
  {
    quote:
      "Meeting with Honarable Prime Minister Narendara Modi",
 
    src:
      "./efforts/2.jpg",
  },
  {
    quote:
      "Meeting with Honarable Prime Minister Narendara Modi",
 
    src:
      "./efforts/3.jpg",
  },
  {
    quote:
      "Meeting with Honarable Prime Minister Narendara Modi",
 
    src:
      "./efforts/4.jpg",
  },
  {
    quote:
      "Meeting with Honarable Prime Minister Narendara Modi",
 
    src:
      "./efforts/5.jpg",
  },
  {
    quote:
      "Meeting with Honarable Prime Minister Narendara Modi",
 
    src:
      "./efforts/6.jpg",
  },
  {
    quote:
      "Meeting with Honarable Prime Minister Narendara Modi",
 
    src:
      "./efforts/7.jpg",
  },
  {
    quote:
      "Meeting with Honarable Prime Minister Narendara Modi",
 
    src:
      "./efforts/8.jpg",
  },
 
 
];
 const ShuffleHero = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full pt-8">
      <div className=" mx-auto ">
    <section className="relative w-full overflow-hidden bg-background">
      {/* Waves Background */}
      <div className="absolute inset-0 z-0">
        <Waves
          lineColor="rgba(02, 98, 0, 0.2)"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          xGap={12}
          yGap={36}
      
        />
      </div>  

      {/* Foreground Content */}
      <div className="relative z-10 w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-[85rem] mx-auto">
        <div>
          <span className="block mb-4 text-xs md:text-sm text-primary font-medium">
            South India Garment Association (SIGA)
          </span>
          <h3 className="text-4xl md:text-6xl font-semibold text-foreground">
  Efforts by the SIGA Association
</h3>
          <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6">
          From engaging with national leaders to presenting the SIGA Pre-Budget Memo, 
  hosting insightful Apparel Talks, and organizing the grand SIGA Fair, 
  our association works tirelessly to represent the garment industry’s voice. 
  These moments capture our ongoing commitment to strengthening connections 
  between industry stakeholders, policymakers, and the business community.
          </p>
          
          <Button
    className="rounded-xl mb-4 px-5 text-base relative cursor-pointer overflow-hidden group hover:bg-gradient-to-r hover:from-yellow-400/30 hover:via-yellow-500/40 hover:to-yellow-400/30"
           
             
            
              aria-label="Explore Siga"
            >
                <Link to={'/efforts'}>

<span className="relative z-10  ">
 <span>           Explore SIGA </span>
</span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-green-500/40 to-green-400/30  
               
              
              opacity-100 transition-opacity duration-300 -skew-x-12" />
</Link>
            </Button>
        </div>
  <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#f7f7ff",
              designation: "#e1e1e1",
              testimony: "#f1f1f7",
              arrowBackground: "#0582CA",
              arrowForeground: "#141414",
              arrowHoverBackground: "#f7f7ff",
            }}
            fontSizes={{
              name: "28px",
              designation: "20px",
              quote: "20px",
            }}
          />
      </div>
    </section>
    </div>
    </div>
  );
};




export default ShuffleHero