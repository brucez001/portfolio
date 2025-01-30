'use client';

import React, { useEffect, useRef, useState } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';

import 'react-vertical-timeline-component/style.min.css';

import { styles } from '@/utils/styles';
import { experiences } from '@/utils/constants';
import { SectionWrapper } from '@/app/hoc';
import { textVariant } from '@/utils/motion';
import ExperienceCard from './ExperienceCard';

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
        <h2 className={`${styles.sectionHeadText} text-center`}>My Experience.</h2>
      </motion.div>

      <div className='mt-20 flex flex-col' ref={ref}>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              visible={visibleList[index]}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'experience');
