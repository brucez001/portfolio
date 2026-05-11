'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import type { Experience } from '@/app/data';

type ExperienceCarouselProps = {
  items: Experience[];
};

export function ExperienceCarousel({ items }: ExperienceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToNextSlide = () => setCurrentIndex((index) => (index + 1) % items.length);
  const goToPreviousSlide = () => setCurrentIndex((index) => (index - 1 + items.length) % items.length);

  return (
    <div className="experience-carousel" aria-label="Career experience carousel">
      <div className="experience-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item) => (
          <article className="experience-slide" key={`${item.company}-${item.role}`}>
            <div className="experience-body">
              <p className="experience-date">{item.date}</p>
              <h3>{item.role}</h3>
              <p className="experience-company">{item.company}</p>
              <p>{item.description}</p>
            </div>
            <div className="experience-media">
              <Image alt={item.imageAlt} fill sizes="(max-width: 768px) 100vw, 520px" src={item.imageSrc} />
            </div>
          </article>
        ))}
      </div>

      <div className="experience-controls">
        <div className="experience-dots" aria-label="Choose experience slide">
          {items.map((item, index) => (
            <button
              aria-label={`Show ${item.company} experience`}
              aria-current={index === currentIndex}
              className={index === currentIndex ? 'is-active' : ''}
              key={item.company}
              onClick={() => goToSlide(index)}
              type="button"
            />
          ))}
        </div>

        <div className="experience-arrows">
          <button aria-label="Previous experience" onClick={goToPreviousSlide} type="button">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button aria-label="Next experience" onClick={goToNextSlide} type="button">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
