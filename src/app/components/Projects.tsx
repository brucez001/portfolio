'use client';

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/app/hoc';
import { styles } from '@/utils/styles';
import { github } from '/public/assets';
import { projects } from '@/utils/constants';
import { fadeIn, textVariant } from '@/utils/motion';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

type Project = {
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: StaticImageData;
  source_code_link: string;
  imgAlignment?: string;
};

const ProjectCard = ({ index, project }: { index: number; project: Project }) => {
  const { name, description, tags, image, source_code_link, imgAlignment } = project;

  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-[100%] flex flex-col justify-between'>
        <div>
          <div className='relative w-full h-[230px]'>
            <Image
              src={image}
              alt='project_image'
              className={`w-full h-full object-cover rounded-2xl ${imgAlignment}`}
            />

            {/* <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, '_blank')}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <Image
                  src={github}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div> */}
          </div>

          <div className='mt-5'>
            <h3 className='text-white font-bold text-[24px]'>{name}</h3>
            <p className='mt-2 text-secondary text-[14px]'>{description}</p>
          </div>
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

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
