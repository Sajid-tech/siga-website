import * as React from "react";
import { Button } from "@/components/ui/button";
import { Drawer } from "vaul";

const Disclaimer = ({ title }) => {
  // Define content mapping
  const contentMap = {
    disclaimer: {
      buttonText: "disclaimer",
      content: (
        <div className="p-6 overflow-y-auto">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-lg mb-6 border-l-4 border-red-500">
            <p className="font-bold text-xl text-red-800 mb-3">DISCLAIMER</p>
            <div className="space-y-4 text-gray-700">
              <p>
                We are an NGO looking to help employees and employers connect. 
                Since these pandemic times are extremely stressful, we hope that 
                some people will benefit from this free service.
              </p>
              <p>
                We do not guarantee the work environment, advance, terms of employment, 
                finalisation of salary, working hours etc. of any firm and vice versa. 
                We do not personally recommend either side and request both parties to 
                perform due diligence before finalization.
              </p>
              <p>
                In short, both sides have to independently assess and make a decision. 
                Foundation India will not be liable under any circumstances for any 
                misunderstanding, dispute etc. and does not stand guarantee for either 
                side/party. There is no commission or payments of any kind to Foundation 
                India for this free service.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    "terms-condition": {
      buttonText: "Terms & Conditions",
      content: (
        <div className="p-6 overflow-y-auto">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg mb-6 border-l-4 border-blue-500">
            <p className="font-bold text-xl text-blue-800 mb-4">Terms & Conditions</p>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-1">1</span>
                <p>A authorization Letter duly signed and sealed.</p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-1">2</span>
                <p>Matter disputed or in question must be within three years. Matters beyond three years will not be entertained.</p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-1">3</span>
                <p>Ledger copy of three years must be attached.</p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-1">4</span>
                <p>Order copy, Sale invoice & dispatch/delivery details must also be produced.</p>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm italic text-gray-600">
                  SIGA reserves the right to consider on merits & accept or reject the request of mediation. 
                  SIGA is only mediating for settlement in recovering members dues. Nowhere responsible for 
                  non-settlement or otherwise.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

  const selected = contentMap[title] || contentMap["disclaimer"];

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="rounded-none  underline hover:scale-105 text-red-800 px-0 text-base relative overflow-hidden hover:cursor-pointer group transition-transform duration-200">
          <span className="relative z-10 font-medium">{selected.buttonText}</span>
          <span className="absolute inset-0 bg-gradient-to-r from-red-100 via-orange-100 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12" />
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        
        <Drawer.Content className="bg-white z-50 flex flex-col rounded-t-[10px] max-h-[85vh] fixed bottom-0 left-0 right-0 border-red-400 border-t-4">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-red-300/80 mb-2 mt-3" />
          
          {/* Close button */}
          <div className="absolute top-3 right-4">
            <Drawer.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </Drawer.Close>
          </div>

          {/* Dynamic Content */}
          {selected.content}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default Disclaimer;