// import { ReactComponent as Logo } from './logo.svg';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import {NavLink} from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-700 text-gray-700 dark:text-gray-300">
            <div className="max-w-[85vw] mx-auto py-10 px-4 flex flex-wrap justify-between">
                <div>
                    {/*TODO: add logo*/}
                    {/*<Logo className="h-12 w-12 mr-2" />*/}
                    <p>LOGO</p>
                    <div>
                        <h2 className="text-2xl font-bold">Successful Life App</h2>
                        <p className="text-sm">A better way to live your life</p>
                    </div>

                    <div className={'flex mt-5'}>
                        <a href="/" className="text-3xl mr-4">
                            <FaFacebook />
                        </a>
                        <a href="/" className="text-3xl mr-4">
                            <FaTwitter />
                        </a>
                        <a href="/" className="text-3xl">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
                <div className={'flex gap-8'}>
                    <nav className="mr-8">
                        <ul>
                            <li className="mb-3">
                                <NavLink  to="/about">About Us</NavLink>
                            </li>
                            <li className="mb-3">
                                <NavLink  to="/services">Services</NavLink>
                            </li>
                            <li className="mb-3">
                                <NavLink  to="/contact">Contact Us</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <nav className="mr-8">
                        <ul>
                            <li className="mb-3">
                                <NavLink  to="/about">Privacy</NavLink>
                            </li>
                            <li className="mb-3">
                                <NavLink  to="/services">Terms</NavLink>
                            </li>
                            <li className="mb-3">
                                <NavLink  to="/contact">FAQ</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Subscribe to our Newsletter</h3>
                    <form className="flex flex-col">
                        <label htmlFor="email" className="sr-only">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="border rounded py-2 px-3 mb-2"
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-4">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="max-w-screen-lg mx-auto py-4 px-4 border-t border-gray-700 text-sm text-center">
                &copy; 2023 Successful Life App. All rights reserved. Developed by <a href="https://da20shadow.com">da20shadow</a>.
            </div>
        </footer>
    );
}

export default Footer;
