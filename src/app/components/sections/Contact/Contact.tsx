'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFormState } from 'react-dom';
import { SectionWrapper } from '@/app/hoc';
import { styles } from '@/utils/styles';
import { EarthCanvas } from '@/app/components/canvas';
import { slideIn } from '@/utils/motion';
import Image from 'next/image';
import { github_color, linkedin_color } from '/public/assets';
import { initialState, submitContact } from './actions';
import { SubmitButton } from './SubmitButton';

const Contact = () => {
  const [state, formAction] = useFormState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <div className='flex items-center gap-3'>
          <a href='https://github.com/Bruce-zzhu' target='_blank' className='w-10 h-10'>
            <Image src={github_color} alt='github' />
          </a>
          <a href='https://www.linkedin.com/in/bruce-zhu-01/' target='_blank' className='w-10 h-10'>
            <Image src={linkedin_color} alt='linkedin' />
          </a>
        </div>
        <form ref={formRef} action={formAction} className='mt-10 flex flex-col gap-8'>
          <input
            type='text'
            name='nickname'
            tabIndex={-1}
            autoComplete='off'
            className='hidden'
            aria-hidden='true'
          />
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              placeholder="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondaryLight text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              placeholder="What's your email address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondaryLight text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              placeholder="Let's connect!"
              className='bg-tertiary py-4 px-6 placeholder:text-secondaryLight text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          {state.status === 'error' && (
            <p className='text-red-400 text-sm font-medium'>{state.message}</p>
          )}
          {state.status === 'success' && (
            <p className='text-emerald-400 text-sm font-medium'>{state.message}</p>
          )}
          <SubmitButton />
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
