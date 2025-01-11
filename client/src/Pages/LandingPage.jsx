import React from 'react';
import { Link } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

function LandingPage() {
    return (
        <div className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white font-sans min-h-screen pt-16">
            {/*hero section */}
            <section className="bg-gradient-to-r from-blue-400 to-sky-600 dark:bg-gradient-to-r dark:from-sky-800 dark:to-blue-900 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="font-dmSerif text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                        Welcome to Tablea
                    </h1>
                    <p className="font-workSans text-lg md:text-xl mb-8">
                        Streamline your employee management process with ease. A sleek, intuitive platform designed to boost productivity and simplify workflows.
                    </p>
                    <div className="space-x-4">
                        <Link to="/dashboard">
                            <button className="font-workSans bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:-translate-y-1 hover:bg-gray-800 transition-all duration-300">
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/*features */}
            <section className="py-16 bg-gray-100 dark:bg-slate-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="font-dmSerif text-3xl font-bold mb-12">Why Choose Tablea?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <img src="/point.png" alt="Easy to Use" className="mx-auto mb-4 h-16" />
                            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                            <p>Our intuitive interface ensures you spend less time managing and more time growing.</p>
                        </div>
                        <div>
                            <img src="/shield.png" alt="Reliable" className="mx-auto mb-4 h-16" />
                            <h3 className="text-xl font-semibold mb-2">Reliable</h3>
                            <p>Depend on our platform to consistently meet your needs without fail.</p>
                        </div>
                        <div>
                            <img src="/cog.png" alt="Customizable" className="mx-auto mb-4 h-16" />
                            <h3 className="text-xl font-semibold mb-2">Customizable</h3>
                            <p >Adapt the platform to your specific business needs effortlessly.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/*call to action */}
            <section className="py-20 bg-gradient-to-r from-blue-400 to-sky-600 dark:bg-gradient-to-r dark:from-sky-800 dark:to-blue-900 text-white">
    <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">BPI MS Assessment - Confidential Project</h2>
        <p className="text-lg mb-8">
            This web application was developed as part of a take-home assessment for BPI MS. It is intended for assessment purposes only and should not be distributed or used outside of the assessment context.
        </p>
        <div className=" p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
            <p className="text-gray-200 mb-4">
                This project focuses on providing an efficient and secure platform for managing employee data. Designed for internal use within the assessment process.
            </p>
            <Link to="/dashboard">
                <button className="font-workSans bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:-translate-y-1 hover:bg-gray-800 transition-all duration-300">
                    Explore the Dashboard
                </button>
            </Link>
        </div>
    </div>
</section>



            {/*footer */}
            <footer className="bg:white dark:bg-gray-800 text-slate-900 dark:text-gray-300 py-6">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-md">© {new Date().getFullYear()}. All Rights Reserved.</p>
                    <p>Made with <span className='text-red-600'>❤</span> by <a className='hover:text-blue-400' target='_blank' href="https://wakatime.com/@Jejester">Jester De La Cruz</a></p>
                    <div className="space-x-4 mt-4 md:mt-0">
                        <a href="https://github.com/jejester" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <GitHubIcon />
                        </a>
                        <a href="https://www.facebook.com/cap.njes" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FacebookIcon />
                        </a>
                        <a href="https://www.linkedin.com/in/jester-de-la-cruz-90a934285/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <LinkedInIcon />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
