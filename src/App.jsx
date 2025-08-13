import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const Home = lazy(() => import("./pages/home/Home"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const AboutUs = lazy(() => import("./pages/about/AboutUs"));
const EventSection = lazy(() => import("./pages/event/EventSection"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const VerticalCelebrationText = lazy(() => import("./components/verticalText/VerticalDottedText"));
const Newsletter = lazy(() => import("./components/newsletter/Newsletter"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop/ScrollToTop.jsx"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router >
        <Toaster richColors position="top-right" />
     
          <VerticalCelebrationText />
          <ScrollToTop />
          <Newsletter />
          
          <MainLayout>
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<div className="min-h-screen  bg-yellow-500" />}>
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
  </Routes>
</MainLayout>

     
      </Router>
    </QueryClientProvider>
  );
}

export default App;