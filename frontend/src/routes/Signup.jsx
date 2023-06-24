import React, { useEffect, useState } from 'react';
import { BiSolidHide, BiShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../redux/authReducer/action";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

    const dispatch = useDispatch();
    const sign_up_processing = useSelector((state)=>state.authReducer.sign_up_processing);
    const sign_up_message = useSelector((state)=>state.authReducer.sign_up_message);
    const sign_up_success = useSelector((state)=>state.authReducer.sign_up_success);
    const sign_up_failed = useSelector((state)=>state.authReducer.sign_up_failed);
    
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ""
    });


    //  handel input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    //  handel user iniput submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission or validation here
        console.log(formData);

        const user = {
            name: formData.name.trim(),
            password: formData.password.trim(),
            email: formData.email.trim()
        }

        if(user.password.length > 30 || user.email.length > 40 || user.name.length > 30 || formData.confirmPassword.trim().length>30){
            toast.error('Maximum input length exceeded', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        }
        else if(user.password !== formData.confirmPassword.trim()){
            toast.error('Passwords do not match', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        }
        else if(user.password.length<7){
            toast.error('Password must be at least 8 characters long', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        }
        else{
            dispatch(createAccount(user));
        }
    };

    //  set password visiblity
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    useEffect(()=>{
console.log(!sign_up_processing && sign_up_failed && !sign_up_success)
        if(!sign_up_processing && sign_up_failed && !sign_up_success){
            toast.error(sign_up_message, { position: toast.POSITION.BOTTOM_LEFT });            
        }
        if(!sign_up_processing && !sign_up_failed && sign_up_success){
            toast.success("Account Successfully Created.", { position: toast.POSITION.BOTTOM_LEFT });            
        }

    },[sign_up_processing, sign_up_success, sign_up_failed])


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Chat Application
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign up to continue.
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                <input
                                    type="name"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="xyz"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-2.5 py-2.5 text-gray-400 focus:outline-none"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <BiSolidHide className="w-5 h-5" /> : <BiShow className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={sign_up_processing}
                                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${sign_up_processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {sign_up_processing ? (
                                    <div className="flex items-center justify-center">
                                        <span className="mr-2">Please wait</span>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    </div>
                                ) : (
                                    'Sign Up'
                                )}
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </section>
    );
};

export default Signup;
