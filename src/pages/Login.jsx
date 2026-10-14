import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import google from '../assests/google.png'
import Hero from '../assests/Hero 2.jpg'
import { loginUser, registerUser, saveAuthSession } from '../services/auth';
import { useToast } from '../componets/common/Toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlerLogin = async (data) => {
    setLoading(true);
    setLoginError('');
    try {
      const response = await loginUser(data);
      const user = saveAuthSession(response);
      const role = user?.role || 'buyer';
      showToast('Login successful.', 'success');
      navigate(role === 'admin' ? '/admin' : role === 'seller' ? '/seller' : '/');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your details.';
      setLoginError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async() => {
    window.open("http://localhost:4000/api/auth/google", "_self");
  };

  const handlerSignup = async (data) => {
    setLoading(true);
    setSignupError('');
    try {
      await registerUser(data);
      reset();
      setIsSignup(false);
      showToast('Account created. You can now sign in.', 'success');
    } catch (signupRequestError) {
      const message = signupRequestError.response?.data?.message || 'Registration failed. Please try again.';
      setSignupError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (data) => {
    if (isSignup) {
      handlerSignup(data);
      return;
    }

    handlerLogin(data);
  };

  return (
    <main className='min-h-[calc(100vh-5.2rem)] px-5 sm:px-10 lg:px-16 flex justify-center items-center'>
      <div className='mx-auto grid min-h-[calc(100vh-20rem)] max-w-7xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(26,20,15,0.12)] lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='relative hidden min-h-[100px] bg-cover bg-center lg:block' style={{ backgroundImage: `url("${Hero}")` }}>
          <div className='absolute inset-0 bg-black/10' />
          <div className='absolute bottom-12 left-12 max-w-sm text-white'>
            <p className='mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-red-300'>
              UrbanVibe essentials
            </p>
            <h1 className='text-5xl font-semibold leading-[1.05]'>
              Dress with intention.
            </h1>
          </div>
        </div>

        <div className='flex items-center px-7 py-12 sm:px-14 lg:px-16'>
          <div className='w-full max-w-md'>
            <p className='mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-red-500'>
              {isSignup ? 'Join UrbanVibe' : 'Welcome back'}
            </p>
            <h2 className='text-4xl font-semibold tracking-tight text-zinc-950'>
              {isSignup ? 'Create your account' : 'Sign in to your account'}
            </h2>
            <p className='mt-4 text-base leading-4 text-slate-600'>
              {isSignup
                ? 'Build a wardrobe that feels unmistakably yours.'
                : 'Continue exploring considered pieces made for every season.'}
            </p>
            {(loginError && !isSignup) && <p className='mt-5 text-sm text-red-600'>{loginError}</p>}
            {signupError && isSignup && <p className='mt-5 text-sm text-red-600'>{signupError}</p>}

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className='mt-9 flex flex-col gap-5'
            >
              {isSignup && (
                <>
                  <label className='text-sm font-medium text-zinc-700'>
                    Username
                    <input
                      className='w-full border-b border-zinc-300 bg-transparent px-0 py-3 text-black outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500'
                      type='text'
                      placeholder='Choose a username'
                      {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p className='mt-1 text-sm text-red-500'>{errors.username.message}</p>}
                  </label>

                  <label className='text-sm font-medium text-zinc-700'>
                    Account type
                    <select
                      className='w-full border-b border-zinc-300 bg-transparent px-0 py-3 text-zinc-700 outline-none transition-colors focus:border-red-500'
                      {...register('role', { required: 'Please select a role' })}
                    >
                      <option value=''>Select account type</option>
                      <option value='buyer'>Buyer</option>
                      <option value='seller'>Seller</option>
                    </select>
                    {errors.role && <p className='mt-1 text-sm text-red-500'>{errors.role.message}</p>}
                  </label>
                </>
              )}

              <label className='text-sm font-medium text-zinc-700'>
                Email address
                <input
                  className='w-full border-b border-zinc-300 bg-transparent px-0 py-3 text-black outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500'
                  type='email'
                  placeholder='you@example.com'
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
              </label>

              <label className='text-sm font-medium text-zinc-700'>
                Password
                <input
                  className='w-full border-b border-zinc-300 bg-transparent px-0 py-3 text-black outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500'
                  type='password'
                    placeholder={isSignup ? 'Create a password' : 'Enter your password'}
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}
              </label>

              <button
                type='submit'
                className='mt-3 w-full bg-black py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-400'
                disabled={loading}
              >
                {isSignup ? 'Create account' : loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            {!isSignup && (
              <button
                type='button'
                onClick={handleGoogleLogin}
                className='mt-4 flex w-full items-center justify-center gap-3 border border-zinc-300 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-black hover:text-black'
              >
                <img src={google} alt='' className='h-5 w-5' />
                Continue with Google
              </button>
            )}

            <div className='mt-8 flex justify-center gap-1 text-sm'>
              <p className='text-zinc-500'>{isSignup ? 'Already have an account?' : 'New to UrbanVibe?'}</p>
              <button
                type='button'
                onClick={() => {
                  setIsSignup(!isSignup);
                  setSignupError('');
                  reset();
                }}
                className='font-semibold text-red-500 hover:text-black'
              >
                {isSignup ? 'Sign in' : 'Create an account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
