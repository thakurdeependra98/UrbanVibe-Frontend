import React from 'react'
import Hero from '../assests/Hero Page Image.jpg'

const Home = () => {
  return (
      <section
        className='relative min-h-[min(760px,calc(100vh-5rem))] w-full overflow-hidden bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url("${Hero}")` }}
        aria-label='Fall and winter collection'
      >
        <div className='absolute inset-0 bg-white/10' />
  
        <div className='relative z-10 flex min-h-[min(760px,calc(100vh-5rem))] max-w-7xl items-center px-8 py-20 sm:px-14 lg:px-22'>
          <div className='max-w-xl'>
            <p className='mb-6 text-sm font-semibold uppercase tracking-[0.28em] text-red-500'>
              Summer collection
            </p>
            <h1 className='max-w-lg text-5xl font-semibold leading-[1.08] tracking-tight text-zinc-950 sm:text-6xl lg:text-6xl'>
              Fall - Winter Collections 2030
            </h1>
            <p className='mt-8 max-w-lg text-base leading-5 text-slate-700 sm:text-lg'>
              A specialist label creating luxury essentials. Ethically crafted
              with an unwavering commitment to exceptional quality.
            </p>
            <button
              type='button'
              className='mt-10 inline-flex items-center gap-4 bg-black px-8 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-red-500'
            >
              Shop now
              <span aria-hidden='true' className='text-xl leading-none'>
                &rarr;
              </span>
            </button>
          </div>
        </div>
        </section>
    )
}

export default Home;