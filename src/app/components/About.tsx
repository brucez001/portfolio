'use client';

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

import { styles } from '@/utils/styles';
import { services } from '@/utils/constants';
import { fadeIn, textVariant } from '@/utils/motion';
import { SectionWrapper } from '@/app/hoc';
import Image, { StaticImageData } from 'next/image';
import { photo } from '/public/assets';

const ServiceCard = ({
  index,
  title,
  icon,
}: {
  index: number;
  title: string;
  icon: StaticImageData;
}) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        // options={{
        //   max: 45,
        //   scale: 1,
        //   speed: 450,
        // }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <Image src={icon} alt='web-development' className='w-16 h-16 object-contain' />

        <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

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
