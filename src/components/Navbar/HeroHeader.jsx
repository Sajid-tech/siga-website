import { cn } from "@/lib/utils";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Event", href: "/event" },
  { name: "Service", href: "/service" },
  {
    name: "Others",
    href: "/other",
    subItems: [
      { name: "Efforts", href: "/efforts" },
      { name: "Gallery", href: "/gallery" },
      { name: "Directory", href: "/directory" },
      { name: "Managing Committee", href: "/committee" },
      { name: "Contact", href: "/contact" },
    ],
  },
];
const menuItemsMobile = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Event", href: "/event" },
  { name: "Service", href: "/service" },
  { name: "Efforts", href: "/efforts" },
  { name: "Gallery", href: "/gallery" },
  { name: "Directory", href: "/committee" },
  { name: "Managing Committee", href: "/contact" },
  
  
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [showSubmenu, setShowSubmenu] = React.useState(false);
  const [mobileSubmenu, setMobileSubmenu] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (menuState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [menuState]);

  const isActive = (href) => {
    return location.pathname === href;
  };

  const handleNavigation = (href) => {
    navigate(href);
    setMenuState(false);
    setShowSubmenu(false);
    setMobileSubmenu(null);
  };

  const handleMobileSubmenu = (index) => {
    if (mobileSubmenu === index) {
      setMobileSubmenu(null);
    } else {
      setMobileSubmenu(index);
    }
  };

  return (
    <header>
      <nav
        data-state={menuState ? "active" : ""}
        className="fixed z-50 w-full px-2 group"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-white max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                to="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-50 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                {menuState ? (
                  <X className="w-6 h-6 hidden" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredItem(index);
                      if (item.subItems) setShowSubmenu(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      if (item.subItems) setShowSubmenu(false);
                    }}
                  >
                    {item.subItems ? (
                      <button
                        onClick={() => {
                          setShowSubmenu(!showSubmenu);
                        }}
                        className={cn(
                          "text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer",
                          isActive(item.href) &&
                            "text-accent-foreground font-medium",
                          hoveredItem === index && "text-accent-foreground"
                        )}
                      >
                        <span className="flex items-center gap-1">
                          {item.name}
                          {item.subItems && (
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${
                                showSubmenu && item.subItems ? "rotate-90" : ""
                              }`}
                            />
                          )}
                        </span>
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(item.href);
                        }}
                        className="block"
                      >
                        <button
                          className={cn(
                            "text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer",
                            isActive(item.href) &&
                              "text-accent-foreground font-medium",
                            hoveredItem === index && "text-accent-foreground"
                          )}
                        >
                          {item.name}
                        </button>
                      </Link>
                    )}

                    {item.subItems && showSubmenu && hoveredItem === index && (
                      <div className="absolute left-0 top-full w-48 rounded-md bg-white shadow-lg border z-50">
                        <ul>
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavigation(subItem.href);
                                }}
                                className="block"
                              >
                                <button className="block w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-gray-200 hover:text-accent-foreground cursor-pointer">
                                  {subItem.name}
                                </button>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link
                  to="/become-member"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/become-member");
                  }}
                >
                  <span>Become Member</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
{/* mobile  */}
        {/* <div
          className={cn(
            "fixed inset-0 bg-white z-40 transform transition-all duration-500 ease-in-out lg:hidden",
            menuState
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          )}
        >
          <div className="absolute inset-0 overflow-hidden bg-white">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-100/50 blur-[100px]"></div>
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-yellow-100/50 blur-[100px]"></div>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 30%, #3b82f6 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #f59e0b 1px, transparent 1.5px)",
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>

          <div className="relative z-10 flex flex-col h-full pt-16 pb-8 px-6 overflow-y-auto">
           
            <div className="absolute top-4 left-6">
              <Link
                to="/"
                aria-label="home"
                className="flex items-center group"
                onClick={() => setMenuState(false)}
              >
                <div className="relative">
                  <Logo className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-yellow-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              </Link>
            </div>

         
            <button
              onClick={() => setMenuState(false)}
              className="absolute top-5 right-2 z-50 p-3 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200/50 group"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
            </button>

            <div className="flex-1 mt-5">
              <ul className="space-y-3">
                {menuItemsMobile.map((item, index) => (
                  <li key={index} className="group">
                    {item.subItems ? (
                      <div className="relative">
                        <div className="relative bg-white backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                          <span className="absolute -left-px -top-px block size-2 border-l-2 border-t-2 border-blue-500"></span>
                          <span className="absolute -right-px -top-px block size-2 border-r-2 border-t-2 border-blue-500"></span>
                          <span className="absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 border-blue-500"></span>
                          <span className="absolute -bottom-px -right-px block size-2 border-b-2 border-r-2 border-blue-500"></span>

                          <button
                            onClick={() => handleMobileSubmenu(index)}
                            className={cn(
                              "text-gray-800 hover:text-blue-600 flex items-center justify-between w-full p-4 duration-300 cursor-pointer font-medium text-lg relative overflow-hidden",
                              isActive(item.href) && "text-blue-600"
                            )}
                          >
                            <span className="relative z-10">{item.name}</span>
                            <ChevronRight
                              className={`w-5 h-5 transition-transform duration-300 ${
                                mobileSubmenu === index ? "rotate-90" : ""
                              }`}
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-yellow-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </button>

                          {mobileSubmenu === index && (
                            <div className="px-4 pb-4">
                              <ul className="space-y-2 bg-gray-50/80 rounded-lg p-4">
                                {item.subItems
                                  
                                  .map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      <Link
                                        to={subItem.href}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleNavigation(subItem.href);
                                        }}
                                        className="block"
                                      >
                                        <button
                                          className={cn(
                                            "text-gray-700 hover:text-blue-600 block w-full text-left py-3 px-4 duration-300 cursor-pointer rounded-lg hover:bg-white/60 transition-all font-medium relative group",
                                            isActive(subItem.href) &&
                                              "text-blue-600 bg-blue-50/80 font-semibold"
                                          )}
                                        >
                                          <span className="relative z-10">
                                            {subItem.name}
                                          </span>

                                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-500 rounded-r group-hover:h-8 transition-all duration-300"></div>
                                        </button>
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="relative bg-white backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                        <span className="absolute -left-px -top-px block size-2 border-l-2 border-t-2 border-yellow-500"></span>
                        <span className="absolute -right-px -top-px block size-2 border-r-2 border-t-2 border-yellow-500"></span>
                        <span className="absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 border-yellow-500"></span>
                        <span className="absolute -bottom-px -right-px block size-2 border-b-2 border-r-2 border-yellow-500"></span>

                        <Link
                          to={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(item.href);
                          }}
                          className="block"
                        >
                          <button
                            className={cn(
                              "text-gray-800 hover:text-blue-600 block w-full text-left p-4 duration-300 cursor-pointer text-lg font-medium relative overflow-hidden",
                              isActive(item.href) && "text-blue-600"
                            )}
                          >
                            <span className="relative z-10">{item.name}</span>

                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-yellow-500 rounded-r group-hover:h-8 transition-all duration-300"></div>
                          </button>
                        </Link>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col space-y-4 mt-8 pt-6">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

              <div className="space-y-4">
                <div className="relative group">
                  <Link
                    to="/become-member"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("/become-member");
                    }}
                    className="block"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group border-0"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Become Member
                      </span>

                      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-full group-hover:translate-x-0"></div>
                    </Button>
                  </Link>
                </div>

                <div className="relative group">
                  <Link
                    to="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("/contact");
                    }}
                    className="block"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-blue-600/60 text-blue-600 hover:bg-blue-50 hover:border-blue-700 font-semibold py-4 rounded-xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg relative overflow-hidden bg-white/80 backdrop-blur-sm"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Contact Us
                      </span>

                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-yellow-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="text-center   mt-6">
                <p className="text-xs text-gray-500">
                  Connecting professionals in the apparel sector
                </p>
                <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-blue-400 to-yellow-400 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </div> */}
       <div
  className={cn(
    "fixed inset-0 bg-gradient-to-br from-blue-50/80 via-white to-yellow-50/80 z-40 transform transition-all duration-300 ease-out lg:hidden backdrop-blur-sm",
    menuState
      ? "translate-x-0 opacity-100"
      : "translate-x-full opacity-0"
  )}
>
  {/* Simplified background */}
  <div className="absolute inset-0 bg-white/70"></div>
  
  <div className="relative z-10 flex flex-col h-full pt-12 pb-6 px-5 overflow-y-auto">
    {/* Logo - made more compact */}
    <div className="absolute top-3 left-4">
      <Link
        to="/"
        aria-label="home"
        className="flex items-center"
        onClick={() => setMenuState(false)}
      >
        <Logo className="h-12 w-auto" />
      </Link>
    </div>

    {/* Close button - more compact */}
    <button
      onClick={() => setMenuState(false)}
      className="absolute top-3 right-3 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white shadow-md transition-all duration-200 cursor-pointer border border-gray-200"
      aria-label="Close menu"
    >
      <X className="w-5 h-5 text-red-600" />
    </button>

    <div className="flex-1 mt-8 ">
      <ul className="space-y-2">
        {menuItemsMobile.map((item, index) => (
          <li key={index} className="group">
           
              <div className="relative  bg-white/90 backdrop-blur rounded-lg shadow-xs border border-gray-100 overflow-hidden transition-all duration-200 group-hover:shadow-sm">
                <Link
                  to={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  className="block"
                >
                  <button
                    className={cn(
                      "text-gray-800 hover:text-blue-600 block w-full text-left p-2 duration-200 cursor-pointer text-base font-medium",
                      isActive(item.href) && "text-blue-600 bg-blue-50/50 border-b-2"
                    )}
                  >
                    {item.name}
                  </button>
                </Link>
              </div>
          
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-col space-y-3 mt-2 pt-2 border-t border-gray-200/60">
      <div className="space-y-2">
        <div className="relative">
          <Link
            to="/become-member"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/become-member");
            }}
            className="block"
          >
            <Button
              size="md"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-lg cursor-pointer transition-all duration-200 shadow-md hover:shadow-sm relative"
            >
              <span className="flex items-center justify-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Become Member
              </span>
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Link
            to="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/contact");
            }}
            className="block"
          >
            <Button
              variant="outline"
              size="md"
              className="w-full border border-blue-600/40 text-blue-600 hover:bg-blue-50 hover:border-blue-700 font-medium py-3 rounded-lg cursor-pointer transition-all duration-200 shadow-xs hover:shadow-sm bg-white/80"
            >
              <span className="flex items-center justify-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Contact Us
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          Connecting professionals in the apparel sector
        </p>
        <div className="mt-1 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-yellow-400 mx-auto rounded-full"></div>
      </div>
    </div>
  </div>
</div>
      </nav>
    </header>
  );
};

export default HeroHeader;

const Logo = ({ className }) => {
  return (
    <LazyLoadImage
      alt="Company Logo"
      effect="blur"
      src="https://southindiagarmentsassociation.com/assets/images/logo.png"
      className={cn(" h-14 w-auto", className)}
    />
  );
};