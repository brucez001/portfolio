import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import type { SVGProps } from 'react';
import profilePhoto from '../../public/assets/photo.png';
import { ContactForm } from '@/app/components/ContactForm';
import { ExperienceCarousel } from '@/app/components/ExperienceCarousel';
import { HeroCanvas } from '@/app/components/HeroCanvas';
import { Navigation } from '@/app/components/Navigation';
import { Reveal } from '@/app/components/Reveal';
import { experiences, highlights, navLinks, projects, services, skills, socialLinks } from '@/app/data';

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.3c0 .32.21.69.82.57A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
    </svg>
  );
}

const socialIcons = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
};

export default function Portfolio() {
  return (
    <>
      <Navigation links={navLinks} />

      <main>
        <section className="hero" id="home">
          <HeroCanvas />
          <div className="hero-content">
            <p className="hero-label">Software Developer - Melbourne</p>
            <h1>
              I build things
              <br />
              for the <em>web</em>
            </h1>
            <p className="hero-summary">
              Developer at CoinJar. I like making products that are fast, reliable, and actually pleasant to use -
              from crypto platforms to supply-chain systems.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View my work
                <ArrowRight aria-hidden="true" />
              </a>
              <div className="social-buttons" aria-label="Social links">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.label];
                  return (
                    <a href={link.href} key={link.href} rel="noopener noreferrer" target="_blank">
                      <Icon aria-hidden="true" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <Reveal>
            <p className="section-label">01 - Introduction</p>
            <h2 className="section-title">About me</h2>
          </Reveal>
          <div className="about-layout">
            <Reveal className="about-photo">
              <Image
                alt="Bruce Zhu"
                fill
                priority
                sizes="(max-width: 768px) 220px, 280px"
                src={profilePhoto}
              />
            </Reveal>
            <Reveal className="about-copy">
              <p>
                I&apos;m a software developer based in Melbourne with experience across full-stack development, from
                building Web3 products to optimising supply-chain systems. I care about clean code, reliable delivery,
                and product experiences that work well for real people.
              </p>
              <p>
                Outside my day-to-day at CoinJar, I&apos;m curious about crypto markets, side projects, and tools that
                make development feel sharper and more enjoyable.
              </p>
              <dl className="highlight-grid">
                {highlights.map((highlight) => (
                  <div key={highlight.label}>
                    <dt>{highlight.label}</dt>
                    <dd>{highlight.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="section" id="experience">
          <Reveal>
            <p className="section-label">02 - What I do</p>
            <h2 className="section-title">Experience</h2>
          </Reveal>
          <Reveal className="experience-layout">
            <ExperienceCarousel items={experiences} />
            <div className="experience-side">
              <div className="skills-list" aria-label="Technical skills">
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <div className="services-list">
                {services.map((service) => (
                  <article className="service-item" key={service.title}>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section" id="projects">
          <Reveal>
            <p className="section-label">03 - Work</p>
            <h2 className="section-title">Selected projects</h2>
          </Reveal>
          <div className="projects-list">
            {projects.map((project) => (
              <Reveal className="project-row" key={project.name}>
                <div className="project-media">
                  <Image alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, 550px" src={project.imageSrc} />
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags" aria-label={`${project.name} technologies`}>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <Reveal>
            <p className="section-label">04 - Get in touch</p>
            <h2 className="section-title">Let&apos;s talk</h2>
          </Reveal>
          <Reveal className="contact-layout">
            <div>
              <p className="contact-intro">
                Have a project in mind, or just want to chat? I&apos;m open to interesting conversations and
                opportunities. Use the form or reach out through socials.
              </p>
              <div className="contact-socials">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.label];
                  return (
                    <a href={link.href} key={link.href} rel="noopener noreferrer" target="_blank">
                      <Icon aria-hidden="true" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
            <ContactForm />
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <span>&copy; 2026 Bruce Zhu</span>
        <span>Built with care</span>
      </footer>
    </>
  );
}
