'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/app/hoc';
import { styles } from '@/utils/styles';
import { projects } from '@/utils/constants';
import { fadeIn, textVariant } from '@/utils/motion';
import ProjectCard from './ProjectCard';

const Projects = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcase my skills and experience through real-world examples of my
          work. I'm passionate about building scalable products that drive long-term profitability
          and success of the business, while ensuring a seamless and intuitive user interface and
          experience.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} project={project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Projects, 'projects');
