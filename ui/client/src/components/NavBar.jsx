import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const location = useLocation();
    
    const openModal = () => { setIsModalOpen(true); };
    const closeModal = () => { setIsModalOpen(false); };
    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); };
    const openRegister = () => setIsRegisterOpen(true);
    const closeRegister = () => setIsRegisterOpen(false);
    
    const isActive = (path) => location.pathname === path ? "dark:text-red-600 dark:border-red-600" : "dark:border-";

    return (
        <>
            <header className="p-4 dark:bg-gray-100 dark:text-gray-800">
                <div className="container flex justify-between h-16 mx-auto">
                    <div className="flex">
                        <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2 m-5">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-red-600">
                                <svg width="75px" height="75px" viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#FFFFFF">
                                    <path d="M55.144 4.688H19.856A44.417 44.417 0 0 1 0 0v14.063A4.688 4.688 0 0 0 4.688 18.75h4.688v9.375H2.344A2.342 2.342 0 0 0 0 30.469v4.688A2.342 2.342 0 0 0 2.344 37.5h7.031v35.157A2.342 2.342 0 0 0 11.719 75h4.688a2.342 2.342 0 0 0 2.343 -2.343V37.5h37.5v35.157A2.342 2.342 0 0 0 58.594 75h4.688a2.342 2.342 0 0 0 2.344 -2.344V37.5h7.032A2.342 2.342 0 0 0 75 35.157v-4.688a2.342 2.342 0 0 0 -2.344 -2.344H65.625V18.75h4.688A4.688 4.688 0 0 0 75 14.063V0a44.417 44.417 0 0 1 -19.857 4.688M18.75 18.75h14.063v9.375H18.75zm37.5 9.375H42.188V18.75H56.25z" />
                                </svg>
                            </div>
                        </a>
                        <ul className="items-stretch hidden space-x-3 lg:flex">
                            <li>
                                <a rel="noopener noreferrer" href="/" aria-label="Back to homepage">
                                    <h1 className="text-black uppercase text-4xl font-bold m-3">
                                        <span>S</span>akura <span>S</span>u<span>s</span>hi
                                    </h1>
                                </a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/about" className={`flex items-center px-4 -mb-1 border-b-2 ${isActive('/about')}`}>ABOUT</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/reserve" className={`flex items-center px-4 -mb-1 border-b-2 ${isActive('/reserve')}`}>RESERVATION</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/menu" className={`flex items-center px-4 -mb-1 border-b-2 ${isActive('/menu')}`}>MENU</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/reviews" className={`flex items-center px-4 -mb-1 border-b-2 ${isActive('/reviews')}`}>REVIEWS</a>
                            </li>
                            {localStorage.token && (
                                 <li className="flex">
                                 <a rel="noopener noreferrer" href="/manage" className={`flex items-center px-4 -mb-1 border-b-2 ${isActive('/manage')}`}>MANAGE</a>
                             </li>
                            )}
                        </ul>
                    </div>
                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        <button onClick={openModal} className="px-8 py-3 mx-2 font-semibold rounded dark:bg-red-600 dark:text-gray-50">Log in</button>
                        {/*<button onClick={openRegister} className="px-8 py-3 font-semibold rounded dark:bg-red-600 dark:text-gray-50">Sign Up</button>*/}
                    </div>
                    <button className="p-4 lg:hidden" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="lg:hidden">
                        <ul className="space-y-3">
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/about" className={`flex items-center px-4 -mb-1 border-b-2 ${isActive('/about')}`}>ABOUT</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/reserve" className={`flex items-center px-4 -mb-1 border-b-2 ${isActive('/reserve')}`}>RESERVATION</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/menu" className={`flex items-center px-4 -mb-1 border-b-2 ${isActive('/menu')}`}>MENU</a>
                            </li>
                            <li className="flex">
                                <a rel="noopener noreferrer" href="/reviews" className={`flex items-center px-4 -mb-1 border-b-2 ${isActive('/reviews')}`}>REVIEWS</a>
                            </li>
                            <li className="flex">
                                <button onClick={openModal} className="w-full px-8 py-3 font-semibold rounded my-2 dark:bg-red-600 dark:text-gray-50">Log in</button>
                                {/*<button onClick={openRegister} className="w-full px-8 py-3 font-semibold rounded dark:bg-red-600 dark:text-gray-50">Sign Up</button>*/}
                            </li>
                        </ul>
                    </div>
                )}
            </header>
            {isModalOpen && (
                <LoginModal onClose={closeModal} />
            )}
            {/*{isRegisterOpen && <RegisterModal onClose={closeRegister} />}*/}
        </>
    );
}

export default Navbar;
