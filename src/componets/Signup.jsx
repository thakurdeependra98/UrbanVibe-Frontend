import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Hero from '../assests/Hero 2.jpg';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlerSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/api/register', data);
      console.log(response.data);

      if (response.status === 201) {
        navigate('/login');
      } else {
        alert('Failed to register');
      }
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'buyer') navigate('/buyer');
      if (user.role === 'seller') navigate('/seller');
      if (user.role === 'admin') navigate('/admin');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <main className='min-h-[calc(100vh-8.5rem)] bg-[#f7f5f1] px-5 py-8 sm:px-10 lg:px-16 mb-10'>
      <div className='mx-auto grid min-h-[calc(100vh-20rem)] max-w-7xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(26,20,15,0.12)] lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='relative hidden min-h-[100px] bg-cover bg-center lg:block' style={{ backgroundImage: `url("${Hero}")` }}>
          <div className='absolute inset-0 bg-black/10' />
          <div className='absolute bottom-12 left-12 max-w-sm text-white'>
            <p className='mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-red-300'>
              UrbanVibe essentials
            </p>
            <h1 className='text-5xl font-semibold leading-[1.05]'>
              Find your everyday signature.
            </h1>
          </div>
        </div>

        <div className='flex items-center px-7 py-12 sm:px-14 lg:px-16'>
          <div className='w-full max-w-md'>
            {/* <p className='mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-red-500'>
              Join UrbanVibe
            </p> */}
            <h2 className='text-4xl font-semibold tracking-tight text-zinc-950'>
              Create your account
            </h2>
            <p className='mt-4 text-base leading-4 text-slate-600'>
              Build a wardrobe that feels unmistakably yours.
            </p>

            <form onSubmit={handleSubmit(handlerSubmit)} className='mt-9 flex flex-col gap-5'>
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
                  placeholder='Create a password'
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}
              </label>

              <button type='submit' className='mt-3 w-full bg-black py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-red-500'>
                Create account
              </button>
            </form>

            <div className='mt-8 flex justify-center gap-1 text-sm'>
              <p className='text-zinc-500'>Already have an account?</p>
              <Link to='/login' className='font-semibold text-red-500 hover:text-black'>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
