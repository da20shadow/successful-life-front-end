import {NavLink} from "react-router-dom";

const NotFound = ({ isLoggedIn }) => {

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="max-w-md w-full px-6 py-12 bg-white dark:bg-gray-600 shadow-lg rounded-md text-center">
                <h2 className="text-gray-700 dark:text-gray-300 text-4xl font-bold mb-4">Oops! Page not found</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">The page you are looking for does not exist.</p>
                <NavLink
                    to={isLoggedIn ? '/dashboard' : '/'}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    {isLoggedIn ? 'Go to Dashboard' : 'Go to Home'}
                </NavLink>
            </div>
        </div>
    );
};

export default NotFound;