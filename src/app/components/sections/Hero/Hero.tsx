import React from 'react';
import { styles } from '@/utils/styles';
import { ComputersCanvas } from '@/app/components/canvas';
import { github_color, linkedin_color } from '/public/assets';
import Image from 'next/image';
import Scroller from './Scroller';

const Hero = () => {
  return (
    <section id='home' className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] h-[fit-content] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Bruce</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Full-stack software developer
          </p>
          <div className='flex items-center gap-5 mt-5'>
            <a href='https://github.com/Bruce-zzhu' target='_blank' className='w-12 h-12'>
              <Image src={github_color} alt='github' />
            </a>
            <a
              href='https://www.linkedin.com/in/bruce-zhu-01/'
              target='_blank'
              className='w-12 h-12'
            >
              <Image src={linkedin_color} alt='linkedin' />
            </a>
          </div>
        </div>
      </div>
      <ComputersCanvas />
      <Scroller />
    </section>
  );
};

export default Hero;
