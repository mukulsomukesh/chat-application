import React, { useEffect, useState } from 'react';
import { BiSolidHide, BiShow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../redux/authReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CustomInput from "../components/CommonComponents/CustomInput"
import CustomPasswordInput from '../components/CommonComponents/CustomPasswordInput';
import logo from "../components/assets/logo.png"

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sign_up_processing = useSelector((state) => state.authReducer.sign_up_processing);
    const sign_up_message = useSelector((state) => state.authReducer.sign_up_message);
    const sign_up_success = useSelector((state) => state.authReducer.sign_up_success);
    const sign_up_failed = useSelector((state) => state.authReducer.sign_up_failed);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });

    //  handel input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //  handel user input submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission or validation here

        const user = {
            name: formData.name.trim(),
            password: formData.password.trim(),
            email: formData.email.trim(),
        };

        if (
            user.password.length > 30 ||
            user.email.length > 40 ||
            user.name.length > 30 ||
            formData.confirmPassword.trim().length > 30
        ) {
            toast.error('Maximum input length exceeded', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        } else if (user.password !== formData.confirmPassword.trim()) {
            toast.error('Passwords do not match', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        } else if (user.password.length < 7) {
            toast.error('Password must be at least 8 characters long', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        } else {
            dispatch(createAccount(user));
        }
    };

    //  set password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //  useEffect
    useEffect(() => {
        if (!sign_up_processing && sign_up_failed && !sign_up_success) {
            toast.error(sign_up_message, { position: toast.POSITION.BOTTOM_LEFT });
        }
        if (!sign_up_processing && !sign_up_failed && sign_up_success) {
            toast.success('Account Successfully Created.', { position: toast.POSITION.BOTTOM_LEFT });

            setTimeout(() => {
                navigate('/signin');
            }, 1000);
        }
    }, [sign_up_processing, sign_up_success, sign_up_failed]);

    return (
        <section className="bg-primary-100 dark:bg-primary-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-primary-900 dark:text-white">
                    <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
                    Chat Application
                </a>
                <div className="w-full bg-primary-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-800 dark:border-primary-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-primary-900 md:text-2xl dark:text-white">
                            Sign up to continue.
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="#">

                            {/* user name input */}
                            <CustomInput
                                label="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                name="name"
                                placeholder="xyz"
                                required
                            />

                            {/* user email password */}
                            <CustomInput
                                label="Your email"
                                value={formData.email}
                                type="email"
                                onChange={handleChange}
                                name="email"
                                placeholder="@example.com"
                                required
                            />

                            {/* password input */}
                            <CustomPasswordInput
                                label="Password"
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                                placeholder="••••••••"
                                required
                            />

                            {/* confirm password input */}
                            <CustomPasswordInput
                                label="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                name="confirmPassword"
                                placeholder="••••••••"
                                required
                            />


                            <button
                                type="submit"
                                disabled={sign_up_processing}
                                className={`w-full text-white bg-primary-800 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${sign_up_processing ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {sign_up_processing ? (
                                    <div className="flex items-center justify-center">
                                        <span className="mr-2">Please wait</span>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                    </div>
                                ) : (
                                    'Sign Up'
                                )}
                            </button>

                            <p className="text-sm font-semibold text-primary-500 dark:text-primary-400">
                                Already have an account?{' '}
                                <span onClick={(e) => { navigate('/signin') }} className="cursor-pointer font-bold ml-2 text-primary-600 hover:underline dark:text-primary-500">
                                    Sign in
                                </span>
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
