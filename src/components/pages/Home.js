import {Button} from "@mui/material";
import heroImage from './hero.png';
import {NavLink} from "react-router-dom";

const Home = () => {
    return (

        <section className="bg-blue-100 dark:bg-gray-600">
            <div className="container mx-auto flex flex-col md:flex-row items-center py-12">
                <div className="text-gray-700 dark:text-gray-300 md:w-1/2 lg:w-2/3 md:pr-12 lg:pr-24 xl:pr-32 mb-6 md:mb-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center md:text-left">
                        Welcome to Successful Life App
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-6 text-center md:text-left">
                        Whether you're a student, a professional, or just looking to improve your productivity,
                        our app is designed to help you succeed.
                    </p>
                    <NavLink to={'/register'}>
                        <Button variant="contained" size="large">
                            Get Started
                        </Button>
                    </NavLink>
                </div>
                <div className="md:w-1/2 lg:w-1/3">
                    <img src={heroImage} alt="Successful Life App" className="mx-auto md:mx-0 filter dark:brightness-50" />
                </div>
            </div>
        </section>

            //TODO:
            // <div className="px-20">
            //     <h1>Welcome to Successful Life App</h1>
            //     <p>Our app helps you set and achieve your goals, track your progress, and become more productive.
            //         With features for adding tasks, subtasks, and projects, our app makes it easy to stay organized and
            //         focused.</p>
            //     <p>Whether you're a student, a professional,
            //         or just looking to improve your productivity,
            //         our app is designed to help you succeed.
            //         So why wait? Sign up now and start achieving your goals!</p>
            //     <Button variant="contained" size="large">
            //         Get Started
            //     </Button>
            // </div>

    );
}

export default Home;
