import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Contact from "./pages/contact/Contact";

import { Toaster } from "sonner";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

import AboutUs from "./pages/about/AboutUs.jsx";

import Newsletter from "./components/newsletter/Newsletter";
import VerticalCelebrationText from "./components/verticalText/VerticalDottedText";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
   
      <Toaster richColors position="top-right" />
      <QueryClientProvider client={queryClient}>
     <VerticalCelebrationText/>
      <ScrollToTop />
      <Newsletter/> 
         
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
        
           
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
         
          </Routes>
          
        </MainLayout>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
