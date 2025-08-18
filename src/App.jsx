import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import Newsletter from "./components/newsletter/Newsletter.jsx";
import VerticalDottedText from "./components/verticalText/VerticalDottedText.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Gallery from "./pages/gallery/Gallery.jsx";
import Directory from "./pages/service/Directory.jsx";
import Efforts from "./pages/efforts/Efforts.jsx";
import MemberShip from "./pages/membership/MemberShip.jsx";
import ManagingCommitte from "./pages/committe/ManagingCommitte.jsx";


const Home = lazy(() => import("./pages/home/Home"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const AboutUs = lazy(() => import("./pages/about/AboutUs"));
const EventSection = lazy(() => import("./pages/event/EventSection"));


const Service = lazy(() => import("./pages/service/Service"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router >
        <Toaster richColors position="top-right" />
     
          <VerticalDottedText />
          <ScrollToTop />
          <Newsletter />
          
          <MainLayout>
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<div className="min-h-screen  bg-yellow-500 " />}>
          <Home />
        </Suspense>
      }
    />
    <Route
      path="/contact"
      element={
        <Suspense fallback={<div className="min-h-screen bg-yellow-500" />}>
          <Contact />
        </Suspense>
      }
    />
    <Route
      path="/about"
      element={
        <Suspense fallback={<div className="min-h-screen bg-yellow-500" />}>
          <AboutUs />
        </Suspense>
      }
    />
    <Route
      path="/event"
      element={
        <Suspense fallback={<div className="min-h-screen bg-yellow-500" />}>
          <EventSection />
        </Suspense>
      }
    />
    <Route
      path="/service"
      element={
        <Suspense fallback={<div className="min-h-screen bg-yellow-500" />}>
          <Service />
        </Suspense>
      }
    />
    <Route
      path="/gallery"
      element={
        <Suspense fallback={<div className="min-h-screen bg-yellow-500" />}>
          <Gallery />
        </Suspense>
      }
    />
    <Route
      path="/directory"
      element={
        <Suspense fallback={<div className="min-h-screen bg-yellow-500" />}>
          <Directory />
        </Suspense>
      }
    />
    <Route
      path="/efforts"
      element={
        <Suspense fallback={<div className="min-h-screen bg-yellow-500" />}>
          <Efforts />
        </Suspense>
      }
    />
    <Route
      path="/become-member"
      element={
        <Suspense fallback={<div className="min-h-screen bg-yellow-500" />}>
          <MemberShip />
        </Suspense>
      }
    />
    <Route
      path="/committee"
      element={
        <Suspense fallback={<div className="min-h-screen bg-yellow-500" />}>
          <ManagingCommitte />
        </Suspense>
      }
    />
  </Routes>
</MainLayout>

     
      </Router>
    </QueryClientProvider>
  );
}

export default App;