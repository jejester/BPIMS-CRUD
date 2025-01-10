import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Brightness5Icon from '@mui/icons-material/Brightness5'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'Dashboard', path: '/dashboard' },
    ];
    
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 shadow-md transition-all duration-300 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/*logo */}
                        <div className="flex-shrink-0">
                            <h1 className="font-dmSerif text-gray-900 text-2xl md:text-3xl lg:text-5xl font-bold drop-shadow-md dark:text-white">
                                Tablea
                            </h1>
                        </div>

                        {/*desktop navigation */}
                        <div className="font-workSans hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    {link.title}
                                </Link>
                            ))}
                            
                            {/*toggle dark mode */}
                            <button 
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-300"
                            >
                                {darkMode ? 
                                    <DarkModeIcon className="text-gray-600 dark:text-gray-200" /> : 
                                    <Brightness5Icon className="text-yellow-500" />
                                }
                            </button>
                        </div>

                        {/*button for mobile menu */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-300"
                            >
                                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>

                {/*mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden "> 
                        <div className=" font-workSans pt-2 pb-3 space-y-1 bg-white dark:bg-slate-800 shadow-lg">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.title}
                                </Link>
                            ))}
                            
                            {/*mobile version dark mode toggle */}
                            <button 
                                onClick={toggleDarkMode}
                                className="w-full text-left px-3 py-2 rounded-md text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-300"
                            >
                                <div className="flex items-center">
                                    {darkMode ? 
                                        <><DarkModeIcon className="mr-2" /> Dark Mode</> : 
                                        <><Brightness5Icon className="mr-2 text-yellow-500" /> Light Mode</>
                                    }
                                </div>
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar
