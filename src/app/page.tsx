import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import type { SVGProps } from 'react';
import profilePhoto from '../../public/assets/photo.png';
import { ContactForm } from '@/app/components/ContactForm';
import { CursorGlow } from '@/app/components/CursorGlow';
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

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="hero-label"><span aria-hidden="true" /> Bruce Zhu · Software engineer</p>
            <h1 className="hero-headline" aria-label="Design with intent. Build with care.">
              <span aria-hidden="true" className="headline-line">
                <span className="headline-word delay-1">Design</span>{' '}
                <span className="headline-word delay-2">with</span>{' '}
                <span className="headline-word delay-3">intent</span>
              </span>
              <em aria-hidden="true" className="headline-line">
                <span className="headline-word delay-4">Build</span>{' '}
                <span className="headline-word delay-5">with</span>{' '}
                <span className="headline-word delay-6">care</span>
              </em>
            </h1>
            <p className="hero-summary">
              I design and build products that bring value, and feel good to use
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#about">
                Get to know me
                <ArrowDown aria-hidden="true" />
              </a>
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.label];
                return (
                  <a
                    className="button button-secondary"
                    href={link.href}
                    key={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
          <HeroCanvas />
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
                Hi 👋 I&apos;m Bruce Zhu, a design engineer based in Melbourne. I work in both Figma and the component
                code, and I prototype in the real stack rather than in mockups, because the real thing is the only
                honest test of how something feels.
              </p>
              <p>
                I care about the last 10%: easing curves, focus states, empty states, how a layout holds up on a small
                phone or a slow connection. Not just &ldquo;does it work&rdquo; but &ldquo;does it feel right.&rdquo;
                Performance and accessibility are part of that, not chores: a fast, reachable interface is better design.
              </p>
              <p>
                I love seeing what I build create value for someone and make them go &ldquo;wow, that&apos;s nice.&rdquo;
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

          <Reveal>
            <div className="skills-list" aria-label="Technical skills">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-item" data-glow="" key={service.title}>
                  <span aria-hidden="true" className="glow-layer" />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <ol className="experience-timeline" aria-label="Career timeline">
              {experiences.map((item) => (
                <li className="timeline-item" key={`${item.company}-${item.role}`}>
                  <p className="timeline-year">{item.date}</p>
                  <div className="timeline-content">
                    <h3 className="timeline-role">{item.role}</h3>
                    <p className="timeline-company">{item.company}</p>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="section" id="projects">
          <Reveal>
            <p className="section-label">03 - Work</p>
            <h2 className="section-title">Selected projects</h2>
          </Reveal>
          <div className="projects-list">
            {projects.map((project) => (
              <Reveal className="project-row" glow key={project.name}>
                <span aria-hidden="true" className="glow-layer" />
                <div className="project-media">
                  {project.link ? (
                    <a
                      aria-label={`Open ${project.name} (opens in new tab)`}
                      className="project-media-frame"
                      href={project.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 550px"
                        src={project.imageSrc}
                        style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
                      />
                    </a>
                  ) : (
                    <div className="project-media-frame">
                      <Image
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 550px"
                        src={project.imageSrc}
                        style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
                      />
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <h3>
                    {project.link ? (
                      <a
                        className="project-title-link"
                        href={project.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
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
            <h2 className="section-title">Let&apos;s connect</h2>
          </Reveal>
          <Reveal className="contact-layout">
            <p className="contact-intro">
              Have a project in mind, or just want to chat? I&apos;m open to interesting conversations and
              opportunities.
            </p>
            <ContactForm
              footerStart={
                <div className="contact-form-socials" aria-label="Social links">
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
              }
            />
          </Reveal>
        </section>
      </main>

      <CursorGlow />

      <footer className="site-footer">
        <span>&copy; 2026 Bruce Zhu</span>
        <span>Built with love</span>
      </footer>
    </>
  );
}
