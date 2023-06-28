import React, { useEffect, useState } from 'react';
import { BiSolidHide, BiShow } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { signInAccount } from '../redux/authReducer/action';
import CustomInput from '../components/CommonComponents/CustomInput';
import CustomPasswordInput from '../components/CommonComponents/CustomPasswordInput';

const Signin = () => {

  const dispatch = useDispatch();
  const sign_in_processing = useSelector((state) => state.authReducer.sign_in_processing);
  const sign_in_message = useSelector((state) => state.authReducer.sign_in_message);
  const sign_in_success = useSelector((state) => state.authReducer.sign_in_success);
  const sign_in_failed = useSelector((state) => state.authReducer.sign_in_failed);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //  handel input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  //  handel user form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      password: formData.password.trim(),
      email: formData.email.trim()
    }

    if (user.password.length > 30 || user.email.length > 40) {
      toast.error('Maximum input length exceeded', { position: toast.POSITION.BOTTOM_LEFT });
      return;
    }
    else {
      dispatch(signInAccount(user));
    }
  };

  // change password visiblity
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //  useEffect
  useEffect(() => {
    if (!sign_in_processing && sign_in_failed && !sign_in_success) {
      toast.error(sign_in_message, { position: toast.POSITION.BOTTOM_LEFT });
    }
    if (!sign_in_processing && !sign_in_failed && sign_in_success) {
      toast.success("Account Successfully Created.", { position: toast.POSITION.BOTTOM_LEFT });

      setTimeout(() => {
        navigate("/")
      }, 500)

    }

  }, [sign_in_processing, sign_in_success, sign_in_failed])


  return (
    <section className="bg-primary-50 dark:bg-primary-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-primary-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Chat Application
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-800 dark:border-primary-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary-900 md:text-2xl dark:text-white">
              Sign in to continue
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="#">

              <CustomInput // Use the CustomInput component
                label="Your Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="xyz"
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

              <button
                type="submit"
                disabled={sign_in_processing}
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${sign_in_processing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {sign_in_processing ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">Please wait</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>

              <p className="text-sm font-light text-primary-500 dark:text-primary-400">
                Don't have an account? <span onClick={() => { navigate("/signup") }} className="font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-500">Sign up</span>
              </p>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Signin;
