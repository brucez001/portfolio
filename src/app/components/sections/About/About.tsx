'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '@/utils/styles';
import { services } from '@/utils/constants';
import { fadeIn, textVariant } from '@/utils/motion';
import { SectionWrapper } from '@/app/hoc';
import { photo } from '/public/assets';
import ServiceCard from './ServiceCard';

const About = () => {
  return (
    <>
      <div className='flex items-center justify-between flex-wrap gap-10'>
        <div>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>About Me.</h2>
          </motion.div>

          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
          >
            I'm a passionate and skilled software developer with experience in full-stack
            development and expertise in website SEO, web app, and mobile app development. I
            collaborate closely with clients to create efficient, scalable, and user-friendly
            solutions that solve real-world problems, and I enjoy building products that make a
            positive impact on people's lives. Let's work together to bring your ideas to life!
          </motion.p>
        </div>
        <motion.div className='w-[250px] h-[250px] rounded-full overflow-hidden mx-auto'>
          <motion.img
            src={photo.src}
            alt='photo'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, amount: 0.25 }}
            className='w-full h-full object-cover object-center'
          />
        </motion.div>
      </div>
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            icon={service.icon}
            title={service.title}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
