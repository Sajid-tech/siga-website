import { cn } from "@/lib/utils"
import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronRight, Menu, X } from 'lucide-react'
import { Button } from "../ui/button"

const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Event', href: '/event' },
    { name: 'Service', href: '/service' },
    { 
        name: 'Others', 
        href: '/other',
        subItems: [
            { name: 'Efforts', href: '/efforts' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'Directory', href: '/directory' },
            { name: 'Managing Committee', href: '/committee' }
        ]
    },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [hoveredItem, setHoveredItem] = React.useState(null)
    const [showSubmenu, setShowSubmenu] = React.useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (href) => {
        return location.pathname === href
    }

    const handleNavigation = (href) => {
        navigate(href)
        setMenuState(false) 
        setShowSubmenu(false) 
    }

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-999 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-white max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li 
                                        key={index}
                                        className="relative"
                                        onMouseEnter={() => {
                                            setHoveredItem(index)
                                            if (item.subItems) setShowSubmenu(true)
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredItem(null)
                                            if (item.subItems) setShowSubmenu(false)
                                        }}
                                    >
                                        <button
                                            onClick={() => {
                                                if (!item.subItems) {
                                                    handleNavigation(item.href)
                                                } else {
                                                    setShowSubmenu(!showSubmenu)
                                                }
                                            }}
                                            className={cn(
                                                "text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer",
                                                isActive(item.href) && "text-accent-foreground font-medium",
                                                hoveredItem === index && "text-accent-foreground"
                                            )}>
                                            <span className="flex items-center gap-1">
                                                {item.name}
                                                {item.subItems && <ChevronRight className={`w-4 h-4 transition-transform ${showSubmenu && item.subItems ? 'rotate-90' : ''}`} />}
                                            </span>
                                        </button>

                                        {item.subItems && showSubmenu && hoveredItem === index && (
                                            <div className="absolute left-0 top-full  w-48 rounded-md bg-white shadow-lg border z-50">
                                                <ul>
                                                    {item.subItems.map((subItem, subIndex) => (
                                                        <li key={subIndex}>
                                                            <button
                                                                onClick={() => handleNavigation(subItem.href)}
                                                                className="block w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-gray-200 hover:text-accent-foreground cursor-pointer"
                                                            >
                                                                {subItem.name}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            {item.subItems ? (
                                                <div className="relative ">
                                                    <button
                                                        onClick={() => setShowSubmenu(!showSubmenu)}
                                                        className={cn(
                                                            "text-muted-foreground  hover:text-accent-foreground flex items-center gap-1 duration-150 cursor-pointer",
                                                            isActive(item.href) && "text-accent-foreground font-medium"
                                                        )}
                                                    >
                                                        <span>{item.name}</span>
                                                        <ChevronRight className={`w-4 h-4 transition-transform ${showSubmenu ? 'rotate-90' : ''}`} />
                                                    </button>
                                                    {showSubmenu && (
                                                        <ul className="ml-4 mt-2  space-y-2">
                                                            {item.subItems.map((subItem, subIndex) => (
                                                                <li key={subIndex}>
                                                                    <button
                                                                        onClick={() => handleNavigation(subItem.href)}
                                                                        className="text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer"
                                                                    >
                                                                        {subItem.name}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleNavigation(item.href)}
                                                    className={cn(
                                                        "text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer",
                                                        isActive(item.href) && "text-accent-foreground font-medium"
                                                    )}
                                                >
                                                    {item.name}
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3  sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden ')}>
                                    <button className="cursor-pointer" onClick={() => handleNavigation('/become-member')}>
                                        <span>Become Member</span>
                                    </button>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <button className="cursor-pointer" onClick={() => handleNavigation('/contact')}>
                                        <span>Contact</span>
                                    </button>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <button className="cursor-pointer" onClick={() => handleNavigation('/become-member')}>
                                        <span>Become Member</span>
                                    </button>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default HeroHeader

const Logo = ({ className }) => {
    return (
        <LazyLoadImage
            alt="Company Logo"
            effect="blur"
            src="https://southindiagarmentsassociation.com/assets/images/logo.png"
            className={cn('h-12 w-auto', className)}
        />
    )
}