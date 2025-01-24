'use client';

import React, { useEffect, useRef, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';

import 'react-vertical-timeline-component/style.min.css';

import { styles } from '@/utils/styles';
import { experiences } from '@/utils/constants';
import { SectionWrapper } from '@/app/hoc';
import { textVariant } from '@/utils/motion';
import Image, { StaticImageData } from 'next/image';

type Experience = {
  date: string;
  title: string;
  company_name: string;
  icon: StaticImageData;
  iconBg: string;
  points: string[];
};

const ExperienceCard = ({
  experience,
  visibleList,
}: {
  experience: Experience;
  visibleList: boolean;
}) => {
  return (
    <VerticalTimelineElement
      visible={visibleList}
      contentStyle={{
        background: '#1d1836',
        color: '#fff',
      }}
      contentArrowStyle={{ borderRight: '7px solid  #232631' }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <Image
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const [visibleList, setVisibleList] = useState(experiences.map(() => false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleList((prev) => {
            const index = prev.findIndex((visible) => !visible);
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }
      },
      {
        root: null, // Observe relative to viewport
        threshold: [0, 0.3, 0.6],
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>What I have done so far</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Work Experience.</h2>
      </motion.div>

      <div className='mt-20 flex flex-col' ref={ref}>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              visibleList={visibleList[index]}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
